const router = require('koa-router')

import SearchPlace from '../controller/v1/search'
import CityHandle from '../controller/v1/cities'

let v1 = new router()

v1.get('/cities', CityHandle.getCity)
  .get('/cities/:id', CityHandle.getCityById)
  .get('/pois', SearchPlace.search)

export default v1
