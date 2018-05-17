var request = require('request-promise')
// some wx fn
const encode = require('../util/encode')
const config = require('../config')
const xml = require('./xml')

// 返回 true ／ false
exports.auth = (ctx) => {
	const token = config.wx.token,
		signature = ctx.query.signature,
		timestamp = ctx.query.timestamp,
		nonce = ctx.query.nonce

	// 字典排序
	const arr = [token, timestamp, nonce].sort()
	const result = encode.sha1(arr.join(''))

	if (result === signature) {
		return true
	} else {
		return false
	}
};


const fetchAccessToken = async () => {
	const appID = config.wx.appid
	const appSecret = config.wx.appSecret
	const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.wx.appid}&secret=${config.wx.appsecret}`

	return await new Promise((resolve, reject) => {
		request({url: url, json: true}).then((response) => {
			const data = response.access_token
			console.log(response)
			// const now = (new Date().getTime())
			// const expires_in = now + (data.expires_in - 20) * 1000
			// data.expires_in = expires_in
			resolve(data)
		})
	})
}

exports.getUserInfo = async (openid) => {
	fetchAccessToken().then((token) => {
		const url = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token}&openid=${openid}&lang=zh_CN`
		return new Promise((resolve, reject) => {
			request({url: url, json: true}).then((response) => {
				if (response) {
					const data = response
					// const now = (new Date().getTime())
					// const expires_in = now + (data.expires_in - 20) * 1000
					// data.expires_in = expires_in
					resolve(data)
				} else reject(response)
			})
		})
	})
};

exports.fetchAccessToken = fetchAccessToken