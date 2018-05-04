'use strict'

exports.reply = function* (next) {
	var message = this.wexin

	if(message.MsgType === 'event') {
		if (message.Event === 'subscribe') {
			if (message.EventKey) {
				console.log('扫描二维码进来:' + message.EventKey)
			}

			this.body = 'hahaha, '
		} else if(message.Event === 'unsubscribe'){
			console.log('wuqingquguan')
			this.body = ''
		}
	} else {

	}
	yield next
}