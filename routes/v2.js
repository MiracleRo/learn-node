const router = require('koa-router')

import CityHandle from '../controller/v1/cities'
let v2 = new router()

v2.get('/pois/:geohash', CityHandle.pois)

export default v2