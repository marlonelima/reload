import database from '../database'
import { Company, Contributor, Desktop } from '../@types'

export class CompaniesService {
  async getCompanies(): Promise<Company[]> {
    return await database('companies')
  }

  async getCompany(id: number): Promise<Company> {
    return await database('companies').first().where({ id })
  }

  async getCompanyContributors(companyId: number): Promise<Contributor[]> {
    return await database('contributors').where({
      fk_company: companyId
    })
  }

  async getCompanyDesktops(companyId: number): Promise<Desktop[]> {
    return await database('desktops').where({ fk_company: companyId })
  }

  async getDesktops(): Promise<Desktop[]> {
    return await database('desktops')
  }
}
