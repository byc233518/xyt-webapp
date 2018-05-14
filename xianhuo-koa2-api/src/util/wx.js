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
}


exports.fetchAccessToken = () => {
	const appID = config.wx.appid
	const appSecret = config.wx.appSecret
	const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.wx.appid}&secret=${config.wx.appsecret}`

	return new Promise((resolve, reject) => {
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

exports.message = {
	text(msg, content) {
		return xml.jsonToXml({
			xml: {
				ToUserName: msg.FromUserName,
				FromUserName: msg.ToUserName,
				CreateTime: Date.now(),
				MsgType: msg.MsgType,
				Content: content

			}
		})
	},
	recognition(msg, content) {
		return xml.jsonToXml({
			xml: {
				ToUserName: msg.FromUserName,
				FromUserName: msg.ToUserName,
				CreateTime: Date.now(),
				MsgType: 'text',
				Content: content
			}
		})
	},
	articles(msg, messageObj) {
		const header = `<xml>
		               <ToUserName><![CDATA[${msg.FromUserName}]]></ToUserName>
		               <FromUserName><![CDATA[${msg.ToUserName}]]></FromUserName>
		               <CreateTime>${Date.now()}</CreateTime>
		               <MsgType><![CDATA[news]]></MsgType>`;
		let content = '';
		const Articles = messageObj;
		const ArticleCount = messageObj.length;
		content = `<ArticleCount>${ArticleCount}</ArticleCount><Articles>`;
		for (let i = 0; i < ArticleCount; i++) {
			content += `<item>
										 <Title><![CDATA[${Articles[i].title}]]></Title>
										 <Description><![CDATA[${Articles[i].description}]]></Description>
										 <PicUrl><![CDATA[${Articles[i].picUrl}]]></PicUrl>
										 <Url><![CDATA[${Articles[i].url}]]></Url>
									 </item>`;
		}
		content += '</Articles></xml>';
		const xml = header + content;
		const xmlRplacedSpace = xml.replace(/\s/g, '');
		return xmlRplacedSpace
	}
}
