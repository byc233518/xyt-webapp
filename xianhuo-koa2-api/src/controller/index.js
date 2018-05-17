const Monk = require('monk')
const db = new Monk('39.108.77.185:27018/xianhuo');
const jobList = db.get('list');
const company = db.get('company');

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

exports.postHandle = async (ctx, next) => {

	let message,
		MsgType,
		result

	message = ctx.req.body ? xml.formatMessage(ctx.req.body.xml) : ''

	if (!message) {
		ctx.body = 'error request.'
		return;
	}

	MsgType = message.MsgType

	console.log('message', message)

	switch (MsgType) {
		case 'event':
			switch (message.Event) {
				case 'subscribe':
					result = wx.message.text(message, '欢迎关注')
					break;
				case 'CLICK':
					let news = []
					console.log(message.EventKey)
					switch (message.EventKey) {
						case 'intelligent_search':
							console.log('~~~~~~~~~~~')
							await jobList.find().then((res) => {
								res.forEach((item) => {
									console.log('!!!!!!!!!!', item)
									news.push({
										title: '智能搜索到的1条',
										description: '只是个描述而已',
										picUrl: 'http://res.cloudinary.com/moveha/image/upload/v1441184110/assets/images/Mask-min.png',
										url: 'https://www.xetong.cn/xianhuo-webapp/'
									})
								})
							})
							// console.log(jobs)
							// jobs.forEach((item) => {
							// 	news.push({
							// 		title: '智能搜索到的1条',
							// 		description: '只是个描述而已',
							// 		picUrl: 'http://res.cloudinary.com/moveha/image/upload/v1441184110/assets/images/Mask-min.png',
							// 		url: 'https://www.xetong.cn/xianhuo-webapp/'
							// 	})
							// })


							// news.push({
							// 	title: '智能搜索到的1条',
							// 	description: '只是个描述而已',
							// 	picUrl: 'http://res.cloudinary.com/moveha/image/upload/v1441184110/assets/images/Mask-min.png',
							// 	url: 'https://www.xetong.cn/xianhuo-webapp/'
							// });
							break;

						case 'job_recommendation':
							news.push({
								title: '职位推荐的1条',
								description: '只是个描述而已',
								picUrl: 'http://res.cloudinary.com/moveha/image/upload/v1441184110/assets/images/Mask-min.png',
								url: 'https://www.xetong.cn/xianhuo-webapp/'
							});
							break;
						case 'index':
							news.push({
								title: '回到首页',
								description: '只是个描述而已',
								picUrl: 'http://res.cloudinary.com/moveha/image/upload/v1441184110/assets/images/Mask-min.png',
								url: 'https://www.xetong.cn/xianhuo-webapp/'
							});
							break;
					}
					result = wx.message.articles(message, news)
					break;
			}
			break;
		case 'voice':
			const voiceText = message.Recognition
			result = wx.message.recognition(message, voiceText)
			break;
		case 'text':
			const content = message.Content
			let reply = '额，你说的' + message.Content + ' 太复杂了'
			if (content === '1') {
				reply = '天下第一吃大米'
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
