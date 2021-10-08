import database from '../database'
import { Company } from '../@types'

class SearchService {
  async companies(term: string, page?: number): Promise<Company[]> {
    const { data: companies } = await database('companies')
      .where('business_name', 'like', `%${term}%`)
      .orWhere('industry', 'like', `%${term}%`)
      .orWhere('catch_phrase', 'like', `%${term}%`)
      .orWhere('bs_company_statement', 'like', `%${term}%`)
      .paginate({
        perPage: 15,
        currentPage: page ?? 1
      })

    return companies
  }

  async desktops(
    term: string,
    companyId: number,
    page?: number
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
        currentPage: page ?? 1
      })

    return desktops
  }

  async contributors(
    term: string,
    companyId: number,
    page?: number
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
        currentPage: page ?? 1
      })

    return contributors
  }
}

export default SearchService
