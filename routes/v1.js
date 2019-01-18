const router = require('koa-router')

import CityHandle from '../controller/v1/cities'

let v1 = new router()

v1.get('/cities', CityHandle.getCity)
v1.get('/cities/:id', CityHandle.getCityById)

export default v1
