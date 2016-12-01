import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import views from 'koa-views';
import convert from 'koa-convert';
import serve from 'koa-static';
import finalHandler from './lib/middlewares/finalHandler';
import router from './router';
import mongoose from 'mongoose'
import controller from './controllers'
import co from 'co'

const app = new Koa()

co(async() => {
  app.use(finalHandler())
  app.use(views(`${__dirname}/views`, {
    map: {
      html: 'nunjucks'
    }
  }))
  app.use(logger())
  app.use(bodyParser())
  app.keys = ['some secret hurr']
  app.use(convert(session(app)))
  app.use(serve(__dirname + '/public'))
  await controller.init(router)
  app
    .use(router.routes())
    .use(router.allowedMethods())
})

export default app
