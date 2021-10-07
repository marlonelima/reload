import database from '../database'
import { Company, Contributor, Desktop } from '../@types'

export class CompaniesService {
  async index(): Promise<Company[]> {
    return await database('companies')
  }

  async show(id: number): Promise<Company> {
    return await database('companies').first().where({ id })
  }

  async getContributors(companyId: number): Promise<Contributor[]> {
    return await database('contributors').where({
      fk_company: companyId
    })
  }

  async getDesktops(companyId: number): Promise<Desktop[]> {
    console.log(companyId)
    return await database('desktops').where({ fk_company: companyId })
  }
}
