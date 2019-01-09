import Koa from 'koa'
// import Router from 'koa-router'
import routers from './routes/index'

// const router = new Router()
const app = new Koa()

app
  .use(routers.routes())
  .use(routers.allowedMethods());

app.listen(3000)