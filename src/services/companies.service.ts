import database from '../database'
import { Company, Contributor, Desktop } from '../@types'

export class CompaniesService {
  async getCompanies(page?: number): Promise<Company[]> {
    const { data: companies } = await database('companies').paginate({
      perPage: 15,
      currentPage: page ?? 1
    })

    return companies
  }

  async getCompany(id: number): Promise<Company> {
    return await database('companies').first().where({ id })
  }

  async getCompanyContributors(
    companyId: number,
    page?: number
  ): Promise<Contributor[]> {
    const { data: contributors } = await database('contributors')
      .where({
        fk_company: companyId
      })
      .paginate({
        perPage: 15,
        currentPage: page ?? 1
      })

    return contributors
  }

  async getCompanyDesktops(
    companyId: number,
    page?: number
  ): Promise<Desktop[]> {
    const { data: desktops } = await database('desktops')
      .where({ fk_company: companyId })
      .paginate({
        perPage: 15,
        currentPage: page ?? 1
      })

    return desktops
  }

  async getDesktops(page?: number): Promise<Desktop[]> {
    const { data: desktops } = await database('desktops').paginate({
      perPage: 15,
      currentPage: page ?? 1
    })

    return desktops
  }
}
