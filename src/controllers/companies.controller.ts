import CompaniesService from '../services/companies.service'
import { Request, Response } from 'restify'
import { Company, Contributor, Desktop } from '../@types'
import errorHandler from '../errors'

const companiesService = new CompaniesService()

class CompaniesController {
  async getAllCompanies(req: Request, res: Response): Promise<Company[]> {
    const { page } = req.query

    const companies = await companiesService.getAllCompanies(page)

    return res.send(companies)
  }

  async getAllDesktops(req: Request, res: Response): Promise<Desktop[]> {
    const { page } = req.query
    const data = await companiesService.getAllDesktops(page)

    return res.send(data)
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

  async search(req: Request, res: Response) {
    const { page } = req.query
    const companyId = req.header('companyId')
    const { term } = req.body

    if (!term || !companyId)
      return errorHandler(res, 400, 'Todos os parâmetros são obrigatórios!')

    const companies = await companiesService.searchInCompanies(term, page)
    const desktops = await companiesService.searchInDesktops(
      term,
      companyId,
      page
    )
    const contributors = await companiesService.searchInContributors(
      term,
      companyId,
      page
    )

    return res.send({ companies, desktops, contributors })
  }
}

export default CompaniesController
