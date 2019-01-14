const router = require('koa-router')()
import CityHandle from '../controller/v1/cities'

const routers = router.get('/cities', CityHandle.getCity)

export default routers
