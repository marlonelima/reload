import { CompaniesService } from '../services/companies.service'
import { Request, Response } from 'restify'

const companiesService = new CompaniesService()

export class CompaniesController {
  async getCompanies(req: Request, res: Response) {
    const companies = await companiesService.getCompanies()

    return res.send(companies)
  }

  async getCompany(req: Request, res: Response) {
    const { id } = req.params

    const data = await companiesService.getCompany(id)

    return res.send(data)
  }

  async getCompanyContributors(req: Request, res: Response) {
    const { id } = req.params

    const data = await companiesService.getCompanyContributors(id)

    return res.send(data)
  }

  async getCompanyDesktops(req: Request, res: Response) {
    const { id } = req.params

    const data = await companiesService.getCompanyDesktops(id)

    return res.send(data)
  }

  async getDesktops(req: Request, res: Response) {
    const data = await companiesService.getDesktops()

    return res.send(data)
  }
}
