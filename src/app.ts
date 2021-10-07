import restify from 'restify'
import dotenv from 'dotenv'

import companiesRoute from './routes/companies.routes'

const app = restify.createServer({ ignoreTrailingSlash: true })

dotenv.config()

companiesRoute.applyRoutes(app, '/companies')

app.pre(restify.pre.sanitizePath())

export default app
