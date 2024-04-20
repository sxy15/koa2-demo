const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// const jwtKoa = require('koa-jwt')
const session = require('koa-generic-session')
const redis = require('koa-redis')
// const { SECRET } = require('./conf/constants')
const { REDIS_CONF } = require('./conf/db')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

const blog = require('./routes/view/blog')
const error = require('./routes/view/error')
const user = require('./routes/view/user')
const apiUser = require('./routes/api/user')
const apiUtils = require('./routes/api/utils')
const apiBlog = require('./routes/api/blog-home')
const apiBlogProfile = require('./routes/api/blog-profile')
const apiBlogSquare = require('./routes/api/blog-square')
const apiAt = require('./routes/api/blog-at')

// error handler
onerror(app, {
    redirect: '/error'
})

// app.use(jwtKoa({
//     secret: SECRET
// }).unless({
//     path: [/^\/users\/login/]
// }))

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
    key: 'weibo.sid', // cookie name 默认是 'koa.sid'
    prefix: 'weibo:sess:', // redis key 的前缀，默认是 'koa:sess:'
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // ms
    },
    // ttl: 24 * 60 * 60 * 1000, // redis 过期时间 默认按照 cookie maxAge 设置
    store: redis({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    })
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(apiUser.routes(), apiUser.allowedMethods())
app.use(apiBlog.routes(), apiBlog.allowedMethods())
app.use(apiBlogProfile.routes(), apiBlogProfile.allowedMethods())
app.use(apiBlogSquare.routes(), apiBlogSquare.allowedMethods())
app.use(apiAt.routes(), apiAt.allowedMethods())
app.use(apiUtils.routes(), apiUtils.allowedMethods())
app.use(error.routes(), error.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
