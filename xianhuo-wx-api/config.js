
var path = require('path')
var util = require('./libs/util')
var wechat_file = path.join(__dirname, 'config/wechat.txt')

var config={
	wechat:{
		appID: 'wx185463cc92b5ca47',
		appSecret: '81c2262eccfe70810587e6f82face06d',
		token: '123',
		getAccessToken: function () {
			return util.readFileAsync(wechat_file)
		},
		saveAccessToken: function (data) {
			data = JSON.stringify(data)
			return util.writeFileAsync(wechat_file, data)
		},
	}
}

module.exports = config