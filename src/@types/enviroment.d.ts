declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'staging'
      PORT: string
      REDIS_PORT: number
      REDIS_HOST: string
      DB_HOST: string
      DB_PORT: string
      DB_NAME: string
      DB_USER: string
      DB_PASSWORD: string
    }
  }
}

export {}
