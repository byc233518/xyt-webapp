'use strict'

var sha1 = require('sha1')
var getRawBody = require('raw-body')
var Wechat = require('./wechat')
var util = require('./util')

module.exports = function(opts, handler) {
  var wechat = new Wechat(opts)

  return async (ctx, next) => {
    var token = opts.token
    var signature = this.query.signature
    var nonce = this.query.nonce
    var timestamp = this.query.timestamp
    var echostr = this.query.echostr
    var str = [token, timestamp, nonce].sort().join('')
    var sha = sha1(str)
    if (ctx.method === 'GET') {
      if (sha === signature) {
				ctx.body = echostr + ''
      }
      else {
				ctx.body = 'wrong'
      }
    }
    else if (ctx.method === 'POST') {
      if (sha !== signature) {
        this.body = 'wrong'

        return false
      }

      var data = await getRawBody(ctx.req, {
        length: ctx.length,
        limit: '1mb',
        encoding: ctx.charset
      })

      var content = await util.parseXMLAsync(data)

      console.log(content)

      var message = util.formatMessage(content.xml)

      console.log(message)

      this.weixin = message

      await handler.call(this, next)

      wechat.reply.call(this)
    }
  }
}
