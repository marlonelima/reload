import { CompaniesService } from '../services/companies.service'
import { Request, Response } from 'restify'
import { Company, Contributor, Desktop } from '../@types'

const companiesService = new CompaniesService()

export class CompaniesController {
  async getCompanies(req: Request, res: Response): Promise<Company[]> {
    const { page } = req.query

    const companies = await companiesService.getCompanies(page)

    return res.send(companies)
  }

  async getCompany(req: Request, res: Response): Promise<Company> {
    const { id } = req.params

    const data = await companiesService.getCompany(id)

    return res.send(data)
  }

  async getCompanyContributors(
    req: Request,
    res: Response
  ): Promise<Contributor[]> {
    const { page } = req.query
    const { id } = req.params

    const data = await companiesService.getCompanyContributors(id, page)

    return res.send(data)
  }

  async getCompanyDesktops(req: Request, res: Response): Promise<Desktop[]> {
    const { page } = req.query
    const { id } = req.params

    const data = await companiesService.getCompanyDesktops(id, page)

    return res.send(data)
  }

  async getDesktops(req: Request, res: Response): Promise<Desktop[]> {
    const { page } = req.query
    const data = await companiesService.getDesktops(page)

    return res.send(data)
  }
}
