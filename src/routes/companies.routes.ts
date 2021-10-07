import { Router } from 'restify-router'
import { CompaniesController } from '../controllers/companies.controller'

const companiesRoute = new Router()

const companiesController = new CompaniesController()

companiesRoute.get('/', companiesController.index)
companiesRoute.get('/:id', companiesController.show)
companiesRoute.get(
  '/:companyId/contributors',
  companiesController.getContributors
)
companiesRoute.get('/:companyId/desktops', companiesController.getDesktops)

companiesRoute.post('/', (req, res) => {
  res.send('procurar por termo')
})

export default companiesRoute
