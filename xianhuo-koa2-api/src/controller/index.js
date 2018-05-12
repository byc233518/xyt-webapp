// index controller
const wx = require('../util/wx')
const xml = require('../util/xml')

exports.getHandle = async (ctx, next) => {
	const result = wx.auth(ctx)
	if (result) {
		ctx.body = ctx.query.echostr
	} else {
		ctx.body = {code: -1, msg: "You aren't wechat server !"}
	}
}

exports.postHandle = (ctx, next) => {
	let message,
		MsgType,
		result

	message = ctx.req.body ? xml.formatMessage(ctx.req.body.xml) : ''

	if (!message) {
		ctx.body = 'error request.'
		return;
	}

	MsgType = message.MsgType

	console.log(MsgType)

	switch (MsgType) {
		case 'event':
			switch (message.Event) {
				case 'subscribe':
					result = '欢迎关注'
					break;
				case 'unsubscribe':
					result = 'unsubscribe'
					break;
				case 'LOCATION':
					result = 'LOCATION'
					break;
				case 'SCAN':
					result = 'SCAN'
					break;
				case 'VIEW':
					result = 'VIEW'
					break;
				case 'scancode_push':
					result = 'scancode_push'
					break;
				case 'scancode_waitmsg':
					result = 'scancode_waitmsg'
					break;
				case 'pic_sysphoto':
					result = 'pic_sysphoto'
					break;
				case 'pic_photo_or_album':
					result = 'pic_photo_or_album'
					break;
				case 'pic_weixin':
					result = 'pic_weixin'
					break;
				case 'location_select':
					result = 'location_select'
					break;
				case 'CLICK':
					news = []
					switch (message.EventKey) {
						case 'movie_hot':
							// let movies = await Movie.findHotMovies(-1, 10)
							// movies.forEach(function (movie) {
							// 	news.push({
							// 		title: movie.title,
							// 		description: movie.title,
							// 		picUrl: movie.poster,
							// 		url: options.baseUrl + '/wechat/jump/' + movie._id
							// 	})
							// })
							news.push()
					}
					result = news
					break;
			}
			break;
		case 'voice':
			console.log(1111111,message.Recognition)
			const voiceText = message.Recognition
			result = wx.message.recognition(message, voiceText)
			break;
		case 'text':
			var content = message.Content
			var reply = '额，你说的' + message.Content + ' 太复杂了'
			console.log('content', content === 1)

			if (content === '1') {
				reply = '天下第一吃大米11'
			}
			else if (content === '2') {
				reply = '天下第二吃豆腐'
			}
			else if (content === '3') {
				reply = '天下第三吃仙丹'
			}
			result = wx.message.text(message, reply)
			break;
		default:
			result = 'success'
	}
	ctx.res.setHeader('Content-Type', 'application/xml')
	ctx.res.end(result)
}
