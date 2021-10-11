import database from '../config/database'
import { Company, Contributor, Desktop } from '../@types'
import { Cache } from '../config/redis'

const ITEMS_PER_PAGE = 15

class CompaniesService {
  async getAllCompanies(page = 1): Promise<Company[]> {
    const companiesCacheIdentifier = `companies_pg=${page}`

    const cached = await Cache.get(companiesCacheIdentifier)
    if (cached) return cached

    const { data: companies } = await database('companies').paginate({
      perPage: ITEMS_PER_PAGE,
      currentPage: page
    })

    await Cache.set(companiesCacheIdentifier, companies)

    return companies
  }

  async getAllDesktops(page = 1): Promise<Desktop[]> {
    const desktopsCacheIdentifier = `desktops_pg=${page}`

    const cached = await Cache.get(desktopsCacheIdentifier)
    if (cached) return cached

    const { data: desktops } = await database('desktops').paginate({
      perPage: ITEMS_PER_PAGE,
      currentPage: page
    })

    await Cache.set(desktopsCacheIdentifier, desktops)

    return desktops
  }

  async getCompany(id: number): Promise<Company> {
    const companyCacheIdentifier = `company_${id}`

    let company = await Cache.get(companyCacheIdentifier)

    company ??= await database('companies').first().where({ id })
    if (company) await Cache.set(companyCacheIdentifier, company)

    return company
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
        perPage: ITEMS_PER_PAGE,
        currentPage: page
      })

    return contributors
  }

  async getCompanyDesktops(companyId: number, page = 1): Promise<Desktop[]> {
    const { data: desktops } = await database('desktops')
      .where({ fk_company: companyId })
      .paginate({
        perPage: ITEMS_PER_PAGE,
        currentPage: page
      })

    return desktops
  }

  async searchInCompanies(term: string, page = 1): Promise<Company[]> {
    const { data: companies } = await database('companies')
      .where('business_name', 'like', `%${term}%`)
      .orWhere('industry', 'like', `%${term}%`)
      .orWhere('catch_phrase', 'like', `%${term}%`)
      .orWhere('bs_company_statement', 'like', `%${term}%`)
      .paginate({
        perPage: 15,
        currentPage: page
      })

    return companies
  }

  async searchInDesktops(
    term: string,
    companyId: string,
    page = 1
  ): Promise<Company[]> {
    const { data: desktops } = await database('desktops')
      .where((builder) => {
        builder
          .where('platform', 'like', `%${term}%`)
          .orWhere('type', 'like', `%${term}%`)
          .orWhere('os', 'like', `%${term}%`)
      })
      .where({ fk_company: companyId })
      .paginate({
        perPage: 15,
        currentPage: page
      })

    return desktops
  }

  async searchInContributors(
    term: string,
    companyId: string,
    page = 1
  ): Promise<Company[]> {
    const { data: contributors } = await database('contributors')
      .where((builder) => {
        builder
          .where('first_name', 'like', `%${term}%`)
          .orWhere('last_name', 'like', `%${term}%`)
          .orWhere('title', 'like', `%${term}%`)
          .orWhere('job_title', 'like', `%${term}%`)
      })
      .where({
        fk_company: companyId
      })
      .paginate({
        perPage: 15,
        currentPage: page
      })

    return contributors
  }
}

export default CompaniesService
