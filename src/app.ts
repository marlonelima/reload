import restify from 'restify'
import dotenv from 'dotenv'
import CorsMiddleware from 'restify-cors-middleware'

import companiesRoute from './routes/companies.routes'
import searchRoute from './routes/search.routes'

const app = restify.createServer({ ignoreTrailingSlash: true })

const cors = CorsMiddleware({
  origins: ['*'],
  allowHeaders: ['Authorization'],
  exposeHeaders: ['Authorization']
})

dotenv.config()

companiesRoute.applyRoutes(app, '/companies')
searchRoute.applyRoutes(app, '/search')

app.pre(cors.preflight)
app.pre(restify.pre.sanitizePath())

app.use(restify.plugins.bodyParser())
app.use(restify.plugins.queryParser())
app.use(restify.plugins.urlEncodedBodyParser())
app.use(cors.actual)

export default app
