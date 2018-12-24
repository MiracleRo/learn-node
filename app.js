const Koa = require('koa')
const Router  = require('koa-router')

const app = new Koa()
const router = new Router()

// app.use(ctx => {
//   ctx.body = 'hello koa'
// })

router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body = 'hello koa'
})

router.get('/users/:id', (ctx, next) => {
  // ctx.router available
  ctx.body = 'hello users'
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000)