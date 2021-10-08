import SearchService from '../services/search.service'
import { Request, Response } from 'restify'
import errorHandler from './../errors/index'

const searchService = new SearchService()

class SearchController {
  async get(req: Request, res: Response) {
    const { page } = req.query
    const { term, companyId } = req.body

    if (!term || !companyId)
      return errorHandler(res, 400, 'Todos os parâmetros são obrigatórios!')

    const companies = await searchService.companies(term, page)
    const desktops = await searchService.desktops(term, companyId, page)
    const contributors = await searchService.contributors(term, companyId, page)

    return res.send({ companies, desktops, contributors })
  }
}

export default SearchController
