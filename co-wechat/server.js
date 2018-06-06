const fs = require('fs')
const Koa = require('koa')
const Monk = require('monk')
const cors = require('koa2-cors')
const cheerio = require('cheerio');
const wechat = require('co-wechat');
const rp = require('request-promise')
const urlencode = require('urlencode')
const router = require('koa-router')()
const superagent = require('superagent');
const bodyParser = require('koa-bodyparser')

const db = new Monk('39.108.77.185:27018/xianhuo');
const jobList = db.get('list');
const company = db.get('company');
const user = db.get('user');
const feedback = db.get('feedback');

const wxMenu = require('./controller/menu')
const config = require('./config')
const wx = require('./util/wx')

const app = new Koa()
app.use(bodyParser()) // 解析 request body
app.use(cors()) // 跨域插件.

// 公众号自定义菜单
// wxMenu.deleteMenu().then(() => {
// 	wxMenu.createMenu()
// });

// 公众号被动回复相关
const help = `感谢您关注 微信版!!
回复 语音 或	文字 查找相关内容,
或者到 <a href='http://web.ngrok.xetong.cn/#/list'>首页</a> 去看看`;

const wxReply = async (message, ctx) => {
	console.log('message', message)
	if (message.MsgType === 'event') {
		if (message.Event === 'subscribe') {
			return {
				type: 'text',
				content: help,
			}
		} else if (message.Event === 'CLICK') {
			if (message.EventKey === 'intelligent_search') {
				// let news = []
				// await jobList.find({}, {limit: 3, skip: 5}).then((res) => {
				// 	res.forEach((item) => {
				// 		news.push({
				// 			title: item.title,
				// 			description: item.desc,
				// 			picUrl: item.thumbnail,
				// 			url: `http://web.ngrok.xetong.cn/#/detail/${item._id}`
				// 		})
				// 	});
				// })
				// return news;
				return {
					content: `点击左下角键盘切换至输入模式,把你感兴趣的职位告诉我吧!
					
输入职位名称, 如: '财务总监',
输入公司名称, 如: '信活',
或者一起搜索, 如: '信活 财务总监'.

现在就试试看吧, 记得搜索某地区的职位中间有空格哦~`,
					type: 'text'
				}
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
							url: `http://web.ngrok.xetong.cn/#/detail/${item._id} `
						})
					});
				})
				return news;
			} else if (message.EventKey === 'bind_account') {
				let isBind = await user.find({openid: message.FromUserName}).then((res) => {
					return res.length !== 0
				})
				if (isBind) {
					return {
						content: `你已经绑定过了,不需要重复绑定了, 可以到 <a href='http://web.ngrok.xetong.cn/#/home'> 个人页面 </a> 去完善相关信息`,
						type: 'text'
					}
				} else {
					await getWxUserInfo(message.FromUserName, 'zh_CN').then((userRes) => {
						const info = JSON.parse(userRes)
						const obj = {
							openid: info.openid,
							nickname: info.nickname,
							sex: info.sex,
							city: info.city,
							province: info.province,
							headimgurl: info.headimgurl,
							subscribe_time: info.subscribe_time,
							subscribe_scene: info.subscribe_scene,
							remark: info.remark,
						}
						user.insert(obj)
					})
					return {
						ontent: `绑定成功! 您可以到 <a href=\'http://web.ngrok.xetong.cn/#/home'> 个人页面 </a> 去完善相关信息`,
						type: 'text'
					}
				}
			} else if (message.EventKey === 'intelligent_search') {
				return {
					content: help,
					type: 'text'
				}
			} else if (message.EventKey === 'intelligent_search') {
				return [
					{
						title: '刷新成功',
						description: '恭喜刷新成功',
						picUrl: '',
						url: `http://web.ngrok.xetong.cn/#/detail/${item._id} `
					}
				]
			}
		}
	} else if (message.MsgType === 'text') {

		let news = []
		await jobList.find({$or:[{"title":new RegExp(message.Content,'ig')}]}, {limit: 5}).then((res) => {
			if (res && res.length) {
				res.forEach((item) => {
					news.push({
						title: item.title,
						description: item.desc,
						picUrl: item.thumbnail,
						url: `http://web.ngrok.xetong.cn/#/detail/${item._id}`
					})
				});
			} else {
				news.push({
					title: '抱歉, 未找到相关信息',
					description: '',
					picUrl: '',
					url: ''
				})
			}
		})
		return news;
	} else if (message.MsgType === 'voice') {
		const voiceText = message.Recognition
		return {
			content: voiceText,
			type: 'text'
		};
	}
};


router.get('/', async(ctx) => {
	ctx.response.type = 'txt';
	ctx.response.body = fs.readFileSync('./MP_verify_nJipiGZOEiInZg2B.txt');
})

router.get('/wx', wechat(config.wx).middleware(wxReply))
router.post('/wx', wechat(config.wx).middleware(wxReply))

router.post('/getWxUserInfo/', async (ctx) => {
	const getTokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wx.appid}&secret=${config.wx.appsecret}&code=${ctx.request.body.code}&grant_type=authorization_code`
	let openID = await rp(getTokenUrl).then((tokenRes) => {
		const token = JSON.parse(tokenRes)
		return token.openid
	})
	await user.find({openid: openID}).then((userInfo) => {
		ctx.response.type = 'application/json';
		ctx.body = userInfo
	})
})

const getWxUserInfo = async (openid, lang = 'zh_CN') => {
	return new Promise((resolve, reject) => {
		wx.fetchAccessToken()
			.then((access_token) => {
				const url = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${access_token}&openid=${openid}&lang=${lang}`
				rp(url).then((res) => {
					if (res) {
						resolve(res)
					} else {
						reject(res)
					}
				})
			})
	})
}

router.get('/list', async (ctx) => { // 获取工作列表
	let list = await jobList.find({}, {limit: 20, skip: 1});
	ctx.response.type = 'application/json';
	ctx.body = list;
})

router.get('/list/:id', async (ctx) => { // 按 ID 获取工作
	let item = await jobList.findOne(ctx.params.id);
	ctx.response.type = 'application/json';
	ctx.body = item;
})

router.post('/list-with-params', async (ctx) => { // 按 条件 获取工作
	const reqParams = ctx.request.body
	let params = {}
	if (reqParams.industry !== '全部行业') {
		params.industry = reqParams.industry
	}
	if (reqParams.city !== '全国') {
		params.city = reqParams.city
	}
	if(reqParams.title) {
		params = {$or:[{"title":new RegExp(reqParams.title,'ig')}]}
	}
	let res = await jobList.find(params);
	ctx.response.type = 'application/json';
	ctx.body = res;
})

router.get('/getUserInfo', async (ctx) => { // 按 条件 获取工作
	let res = await jobList.find(queryString);
	ctx.response.type = 'application/json';
	ctx.body = res;
})

router.delete('/list/:id', async (ctx) => { // 按 ID 删除工作
	let item = await jobList.remove(ctx.params.id);
	ctx.response.type = 'application/json';
	ctx.body = item;
})


router.post('/list', async (ctx) => { // 新增工作
	const reqParams = ctx.request.body
	let obj = {
		num: reqParams.num || '0',
		lat: reqParams.lat || '0',
		lng: reqParams.lng || '0',
		tel: reqParams.tel || '',
		city: reqParams.city || '',
		desc: reqParams.desc || '',
		date: reqParams.date || '',
		title: reqParams.title || '',
		salary: reqParams.salary || '',
		address: reqParams.address || '',
		province: reqParams.province || '',
		requirement: reqParams.requirement || '',
		company_name: reqParams.company_name || '',
		company_id: reqParams.company_id || '',
	}
	let saveRes = await jobList.insert(obj)
	ctx.body = saveRes;
})


router.get('/company/', async (ctx) => { // 获取公司列表
	let item = await company.find();
	ctx.response.type = 'application/json';
	ctx.body = item;
})

router.get('/company/:name', async (ctx) => { // 按照名称获取公司信息
	let item = await company.findOne({name: ctx.params.name});
	ctx.response.type = 'application/json';
	ctx.body = item;
})

router.post('/company', async (ctx) => { // 新增公司
	const reqParams = ctx.request.body
	let obj = {
		name: reqParams.name || '', // 公司
		scale: reqParams.scale || '', // 规模
		nature: reqParams.nature || '', // 公司性质
		is_auth: reqParams.is_auth || '', // 是否认证
		industry: reqParams.industry || '', // 行业
		desc: reqParams.desc || '', // 简介
	}
	let saveRes = await company.insert(obj)
	ctx.body = saveRes;
})

router.post('/feedback/', async (ctx) => {
	const reqParams = ctx.request.body
	let obj = {
		subject: reqParams.subject || '',
		content: reqParams.content || '',
		openid: reqParams.openid || '',
		time: Date.now(),
	}
	let saveRes = await feedback.insert(obj)
	ctx.body = saveRes;
})

// router.post('/list', async ( ctx ) => {
// 	const reqParams = ctx.request.body
//
// 	let obj = {
// 		title: reqParams.title || '',
// 		province: reqParams.province || '',
// 		city: reqParams.city || '',
// 		salary: reqParams.salary || '',
// 		desc: reqParams.desc || '',
// 		tel: reqParams.tel || '',
// 	}
// 	let saveRes = await jobList.insert(obj)
// 	ctx.body = saveRes;
// })

router.get('/crawl', (ctx) => {
	const reptileUrl = 'http://gz.58.com/jianzhi/?PGTID=0d003675-0000-0693-79dd-7a5c5e054980&ClickID=1'
	superagent.get(reptileUrl).end((err, res) => {
		let $ = cheerio.load(res.text);
		$('#infolist dl').each((i, elem) => {
			const url = $(elem).find('dt a').attr('href')
			if (url) {
				superagent.get(url).end((childErr, childRes) => {
					let $ = cheerio.load(childRes.text);
					let obj = {
						num: ($('.zpinfo .loc').eq(0).find('span').text()).replace(/\t/g, ''),
						lat: null,
						lng: null,
						tel: '13333333333',
						city: '广州市',
						desc: $('.xq p').text(),
						date: Date.now(),
						title: $('.zw h1').text(),
						thumbnail: 'https://image0.lietou-static.com/middle_/598280c57032c08e132d954c04a.jpg',
						salary: $('.price span').text(),
						address: $('.zpinfo .loc').eq(2).find('span').text(),
						province: '广东省',
						requirement: $('.xq p').text(),
						company_name: $('.gsjs1 h2 a').text(),
						company_id: 0,
						industry: '服务行业',
					}
					let saveRes = jobList.insert(obj)
					ctx.body = saveRes;
				})
			}
		})
	})
})

app.use(require('koa-static')('./'));
app.use(router.routes())

app.listen(config.port)
console.log('server start at port:', config.port)