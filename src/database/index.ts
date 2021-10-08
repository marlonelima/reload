import knex from 'knex'
import config from '../../knexfile'
import { attachPaginate } from 'knex-paginate'

const env = 'development'

const knexConfig = config[env]

attachPaginate()

export default knex(knexConfig)
