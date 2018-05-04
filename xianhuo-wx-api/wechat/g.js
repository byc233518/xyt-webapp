'use strict'

var sha1 = require('sha1')
var getRowBody = require('raw-body')
var Wechat = require('./wechat')
var util = require('./util')

module.exports = function (opts) {
	// var wechat = new Wechat(opts)


	return function* (next) {
		const that = this
		const token = opts.token
		const signature = this.query.signature
		const nonce = this.query.nonce
		const timestamp = this.query.timestamp
		const echostr = this.query.echostr

		const str = [token, timestamp, nonce].sort().join('')

		const sha = sha1(str)


		if (this.method === 'GET') {
			if (sha === signature) {
				this.body = echostr + ''
			} else {
				this.body = 'wrong'
			}
		} else if (this.method === 'POST') {
			if (sha !== signature) {
				this.body = 'WRONG'

				return false
			} else {
				var data = yield getRowBody(this.req, {
					length: this.length,
					limit: '1mb',
					encoding: this.charset,
				})

				var content = yield util.parseXMLAsync(data)
				var message = util.formatMessage(content.xml)

				if (message.MsgType === 'event') {
					if (message.Event === 'subscribe') {
						var now = new Date().getTime()
						that.status = 200
						that.type = 'application/xml'
						that.body = '<xml>' +
							'<ToUserName><![CDATA[' + message.FromUserName + ']]></ToUserName>' +
							'<FromUserName><![CDATA[' + message.ToUserName + ']]></FromUserName> ' +
							'<CreateTime>' + now + '</CreateTime> ' +
							'<MsgType><![CDATA[text]]></MsgType>' +
							'<Content><![CDATA[Hi , 测试通过]]></Content>' +
							'</xml>'
						return
					}
				}
			}
		}
	}
}

