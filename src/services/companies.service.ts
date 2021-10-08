import database from '../config/database'
import { Company, Contributor, Desktop } from '../@types'
import { Cache } from '../config/redis'

class CompaniesService {
  async getCompany(id: number): Promise<Company> {
    const companyCacheIdentifier = `company_${id}`

    const cached = await Cache.get(companyCacheIdentifier, true)
    if (cached) return cached

    const company = await database('companies').first().where({ id })
    if (company) await Cache.set(companyCacheIdentifier, company)

    return company
  }

  async getCompanies(page = 1): Promise<Company[]> {
    const companiesCacheIdentifier = `companies_pg=${page}`

    const cached = await Cache.get(companiesCacheIdentifier, true)
    if (cached) return cached

    const { data: companies } = await database('companies').paginate({
      perPage: 15,
      currentPage: page
    })

    await Cache.set(companiesCacheIdentifier, companies)

    return companies
  }

  async getCompanyContributors(
    companyId: number,
    page = 1
  ): Promise<Contributor[]> {
    const { data: contributors } = await database('contributors')
      .where({
        fk_company: companyId
      })
      .paginate({
        perPage: 15,
        currentPage: page
      })

    return contributors
  }

  async getCompanyDesktops(companyId: number, page = 1): Promise<Desktop[]> {
    const { data: desktops } = await database('desktops')
      .where({ fk_company: companyId })
      .paginate({
        perPage: 15,
        currentPage: page
      })

    return desktops
  }

  async getDesktops(page = 1): Promise<Desktop[]> {
    const desktopsCacheIdentifier = `desktops_pg=${page}`

    const cached = await Cache.get(desktopsCacheIdentifier, true)
    if (cached) return cached

    const { data: desktops } = await database('desktops').paginate({
      perPage: 15,
      currentPage: page
    })

    await Cache.set(desktopsCacheIdentifier, desktops)

    return desktops
  }
}

export default CompaniesService
