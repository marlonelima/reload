import redis from 'redis'

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
})

export const Cache = {
  async set(key: string, value: any) {
    return new Promise<void>((resolve) => {
      let formatedValue

      if (typeof value === 'string') {
        formatedValue = value
      } else {
        formatedValue = JSON.stringify(value)
      }

      redisClient.set(key, formatedValue, () => resolve())
    })
  },

  async get(key: string, json: boolean): Promise<any | null> {
    return new Promise((resolve) => {
      redisClient.get(key, (err, value) => {
        return resolve(json && value ? JSON.parse(value) : value)
      })
    })
  },

  async del(key: string): Promise<void> {
    return new Promise((resolve) => {
      redisClient.del(key, () => resolve())
    })
  }
}
