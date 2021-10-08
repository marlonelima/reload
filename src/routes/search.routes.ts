import { Router } from 'restify-router'
import SearchController from '../controllers/search.controller'

const searchRoute = new Router()

const searchController = new SearchController()

searchRoute.post('/companies', searchController.companies)
searchRoute.post('/contributors', searchController.contributors)
searchRoute.post('/desktops', searchController.desktops)

export default searchRoute
