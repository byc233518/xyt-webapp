const Koa = require('koa')
const config = require('./src/config')
const logger = require('./src/middleware/logger')
const xmlParse = require('./src/middleware/xmlParse')
const router = require('./src/router')
const wxMenu = require('./src/controller/menu')
const cors = require('koa2-cors')
const app = new Koa()

// wxMenu.deleteMenu()
// wxMenu.createMenu()
	// .then((msg) => {
	// 	console.log('msg', msg)
	// })

app
	.use(cors())
	.use(logger())
	.use(xmlParse())
	.use(router.routes())
	.use(router.allowedMethods())

app.listen(config.port)
console.log('server start at port:', config.port)