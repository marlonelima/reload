import { Router } from 'restify-router'
import SearchController from '../controllers/search.controller'

const searchRoute = new Router()

const searchController = new SearchController()

searchRoute.post('/', searchController.get)

export default searchRoute
