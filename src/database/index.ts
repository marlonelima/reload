import knex from 'knex'
import config from '../../knexfile'

const env = 'development'

const knexConfig = config[env]

export default knex(knexConfig)
