import { Router } from 'restify-router'
import CompaniesController from '../controllers/companies.controller'

const companiesRoute = new Router()

const companiesController = new CompaniesController()

companiesRoute.get('/', companiesController.getCompanies)
companiesRoute.get('/desktops', companiesController.getDesktops)

companiesRoute.get('/:id', companiesController.getCompany)
companiesRoute.get(
  '/:id/contributors',
  companiesController.getCompanyContributors
)
companiesRoute.get('/:id/desktops', companiesController.getCompanyDesktops)

export default companiesRoute
