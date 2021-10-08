import restify from 'restify'
import dotenv from 'dotenv'

import companiesRoute from './routes/companies.routes'
import searchRoute from './routes/search.routes'

const app = restify.createServer({ ignoreTrailingSlash: true })

app.use(restify.plugins.bodyParser())
app.use(restify.plugins.queryParser())
app.use(restify.plugins.urlEncodedBodyParser())

// cors

dotenv.config()

companiesRoute.applyRoutes(app, '/companies')
searchRoute.applyRoutes(app, '/search')

app.pre(restify.pre.sanitizePath())

export default app
