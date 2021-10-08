import knex from 'knex'
import config from '../../knexfile'
import { attachPaginate } from 'knex-paginate'

const knexConfig = config[process.env.NODE_ENV]

attachPaginate()

export default knex(knexConfig)
