import { Router } from 'restify-router'
import CompaniesController from '../controllers/companies.controller'

const companiesRoute = new Router()

const companiesController = new CompaniesController()

companiesRoute.get('/', companiesController.getAllCompanies)
companiesRoute.post('/search', companiesController.search)
companiesRoute.get('/desktops', companiesController.getAllDesktops)

companiesRoute.get('/:id', companiesController.getCompany)
companiesRoute.get(
  '/:id/contributors',
  companiesController.getCompanyContributors
)
companiesRoute.get('/:id/desktops', companiesController.getCompanyDesktops)

export default companiesRoute
