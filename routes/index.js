import Router from 'koa-router'
import v1 from './v1'
import v2 from './v2'

const router = new Router()

router.use('/v1', v1.routes(), v1.allowedMethods())
      .use('/v2', v2.routes(), v2.allowedMethods())       

export default router