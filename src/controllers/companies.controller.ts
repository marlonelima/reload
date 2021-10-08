import CompaniesService from '../services/companies.service'
import { Request, Response } from 'restify'
import { Company, Contributor, Desktop } from '../@types'
import errorHandler from '../errors'

const companiesService = new CompaniesService()

class CompaniesController {
  async getCompanies(req: Request, res: Response): Promise<Company[]> {
    const { page } = req.query

    const companies = await companiesService.getCompanies(page)

    return res.send(companies)
  }

  async getCompany(req: Request, res: Response): Promise<Company | void> {
    const { id } = req.params

    const company = await companiesService.getCompany(id)
    if (!company) return errorHandler(res, 404, 'O ID informado não existe!')

    return res.send(company)
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

export default CompaniesController
