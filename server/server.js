import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session'
import views from 'koa-views'
import convert from 'koa-convert'
import serve from 'koa-static'
import cors from 'koa-cors'
import finalHandler from './lib/middlewares/finalHandler'
import router from './router'
import mongoose from 'mongoose'

import config from './config'

const app = new Koa()
mongoose.Promise = global.Promise
mongoose.connect(config.mongoConfig.url, config.mongoConfig.opts)
app.keys = ['some secret hurr']
app.context.config = config
app
  .use(cors({
  maxAge: 7 * 24 * 60 * 60,
  credentials: true,
  methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',
  headers: 'Content-Type, Accept, Authorization'
}))
  .use(logger())
  .use(bodyParser())
  .use(convert(session(app)))
  .use(serve(__dirname + '/public'))
  .use(router.routes())
  .use(router.allowedMethods())

export default app
