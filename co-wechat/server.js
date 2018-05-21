const Koa = require('koa')
const Monk = require('monk')
const wechat = require('co-wechat');

const wxMenu = require('./controller/menu')
const config = require('./config')

const db = new Monk('39.108.77.185:27018/xianhuo');
const jobList = db.get('list');
const company = db.get('company');

const app = new Koa()

// wxMenu.deleteMenu().then(() => {
// 	wxMenu.createMenu()
// });



const help = `感谢您关注 微信版!
回复 语音 或	文字 查找相关内容,
或者到 <a href='https://www.xetong.cn/xianhuo-webapp'>首页</a> 去看看`;


app.use(wechat(config.wx).middleware(async (message, ctx) => {
	console.log('message', message)
	if (message.MsgType === 'event') {
		if (message.Event === 'subscribe') {
			return {
				type: 'text',
				content: help,
			}
		} else if (message.Event === 'CLICK') {
			if (message.EventKey === 'intelligent_search') {
				let news = []
				await jobList.find({}, {limit: 3, skip: 5}).then((res) => {
					res.forEach((item) => {
						news.push({
							title: item.title,
							description: item.desc,
							picUrl: item.thumbnail,
							url: `http://web.ngrok.xetong.cn/#/detail/${item._id}`
						})
					});
				})
				return news;
			} else if (message.EventKey === 'job_recommendation') {
				let news = []
				await jobList.find({}, {limit: 3, skip: 0}).then((res) => {
					res.forEach((item) => {
						news.push({
							title: item.title,
							description: item.desc,
							picUrl: item.thumbnail,
							url: `http://web.ngrok.xetong.cn/#/detail/${item._id}`
						})
					});
				})
				return news;
			} else if (message.EventKey === 'intelligent_search') {
				let news = []
				await jobList.find({}, {limit: 3, skip: 5}).then((res) => {
					res.forEach((item) => {
						news.push({
							title: item.title,
							description: item.desc,
							picUrl: item.thumbnail,
							url: `http://web.ngrok.xetong.cn/#/detail/${item._id}`
						})
					});
				})
				return news;
			} else if (message.EventKey === 'intelligent_search') {
				return {
					content: help,
					type: 'text'
				}
			} else if (message.EventKey === 'intelligent_search') {
				return {
					content: help,
					type: 'text'
				}
			}
		}
	} else if (message.MsgType === 'text') {
		return {
			content: help,
			type: 'text'
		};
	} else if (message.MsgType === 'voice') {
		const voiceText = message.Recognition
		return {
			content: voiceText,
			type: 'text'
		};
	}


	// 微信输入信息就是这个 message
	// if (message.FromUserName === 'diaosi') {
	// 	// 回复屌丝(普通回复)
	// 	return 'hehe';
	// } else if (message.FromUserName === 'text') {
	// 	//你也可以这样回复text类型的信息
	// 	return {
	// 		content: 'text object',
	// 		type: 'text'
	// 	};
	// } else if (message.FromUserName === 'hehe') {
	// 	// 回复一段音乐
	// 	return {
	// 		type: "music",
	// 		content: {
	// 			title: "来段音乐吧",
	// 			description: "一无所有",
	// 			musicUrl: "http://mp3.com/xx.mp3",
	// 			hqMusicUrl: "http://mp3.com/xx.mp3"
	// 		}
	// 	};
	// } else if (message.FromUserName === 'kf') {
	// 	// 转发到客服接口
	// 	return {
	// 		type: "customerService",
	// 		kfAccount: "test1@test"
	// 	};
	// } else {
	// 	// 回复高富帅(图文回复)
	// 	return [
	// 		{
	// 			title: '你来我家接我吧',
	// 			description: '这是女神与高富帅之间的对话',
	// 			picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
	// 			url: 'http://nodeapi.cloudfoundry.com/'
	// 		},
	// 		{
	// 			title: '你来我家接我吧',
	// 			description: '这是女神与高富帅之间的对话',
	// 			picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
	// 			url: 'http://nodeapi.cloudfoundry.com/'
	// 		},
	// 		{
	// 			title: '你来我家接我吧',
	// 			description: '这是女神与高富帅之间的对话',
	// 			picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
	// 			url: 'http://nodeapi.cloudfoundry.com/'
	// 		}
	// 	];
	// }
}));

app.listen(config.port)
console.log('server start at port:', config.port)