export default {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'reload',
      database: 'reload'
    },
    migrations: {
      tableName: 'migrations',
      directory: __dirname + '/src/database/migrations'
    },
    seeds: {
      directory: __dirname + '/src/database/seeds'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'reload',
      database: 'reload'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'reload',
      database: 'reload'
    }
  }
}
