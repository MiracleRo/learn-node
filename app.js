import Koa from 'koa'
// import Router from 'koa-router'
import db from './mongodb/db.js'
import routers from './routes/index'
import chalk from 'chalk'

// const router = new Router()
const app = new Koa()

app
  .use(routers.routes())
  .use(routers.allowedMethods());

app.listen(3333, () => {
  console.log(
		chalk.green(`成功监听端口：33333`)
	)
})