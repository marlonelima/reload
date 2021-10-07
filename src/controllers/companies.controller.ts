import { CompaniesService } from '../services/companies.service'
import { Request, Response } from 'restify'

const companiesService = new CompaniesService()

export class CompaniesController {
  async index(req: Request, res: Response) {
    const companies = await companiesService.index()

    return res.send(companies)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const data = await companiesService.show(id)

    return res.send(data)
  }

  async getContributors(req: Request, res: Response) {
    const { companyId } = req.params

    const data = await companiesService.getContributors(companyId)

    return res.send(data)
  }

  async getDesktops(req: Request, res: Response) {
    const { companyId } = req.params

    const data = await companiesService.getDesktops(companyId)

    return res.send(data)
  }
}
