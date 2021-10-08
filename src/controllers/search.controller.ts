import SearchService from '../services/search.service'
import { Request, Response } from 'restify'
import errorHandler from './../errors/index'

const searchService = new SearchService()

class SearchController {
  async companies(req: Request, res: Response) {
    const { page } = req.query
    const { term } = req.body

    if (!term) return errorHandler(res, 400, 'Você deve procurar por um termo!')

    const data = await searchService.companies(term, page)

    return res.send(data)
  }

  async desktops(req: Request, res: Response) {
    const { page } = req.query
    const { term, companyId } = req.body

    if (!term || !companyId)
      return errorHandler(res, 400, 'Todos os parâmetros são obrigatórios!')

    const data = await searchService.desktops(term, companyId, page)

    return res.send(data)
  }

  async contributors(req: Request, res: Response) {
    const { page } = req.query
    const { term, companyId } = req.body

    if (!term || !companyId)
      return errorHandler(res, 400, 'Todos os parâmetros são obrigatórios!')

    const data = await searchService.contributors(term, companyId, page)

    return res.send(data)
  }
}

export default SearchController
