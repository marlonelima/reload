import redis from 'redis'

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
})

export const Cache = {
  async set(key: string, value: any, json = true) {
    return new Promise<void>((resolve) => {
      let formatedValue = value

      if (json) {
        formatedValue = JSON.stringify(value)
      }

      redisClient.set(key, formatedValue, () => resolve())
    })
  },

  async get(key: string, json = true): Promise<any | null> {
    return new Promise((resolve) => {
      redisClient.get(key, (err, value) => {
        const result = json && value ? JSON.parse(value) : value

        return resolve(result)
      })
    })
  },

  async del(key: string): Promise<void> {
    return new Promise((resolve) => {
      redisClient.del(key, () => resolve())
    })
  }
}
