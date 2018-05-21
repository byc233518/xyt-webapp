var request = require('request-promise')
const wx = require('../util/wx')

const menus = {
	'button': [{
		'name': '找工作',
		'sub_button': [{
			'name': '智能搜索',
			'type': 'click',
			'key': 'intelligent_search'
		}, {
			'name': '职位推荐',
			'type': 'click',
			'key': 'job_recommendation'
		}, {
			'name': '信活官网',
			'type': 'click',
			'key': 'index'
		}]
	}, {
		'name': '我的信活',
		'sub_button': [{
			'name': '绑定账号',
			'type': 'click',
			'key': 'movie_crime'
		}, {
			'name': '刷新简历',
			'type': 'click',
			'key': 'movie_cartoon'
		}]
	}, {
		'name': '招聘中心',
		'sub_button': [{
			'name': '免费发布职位',
			'type': 'click',
			'key': 'movie_crime'
		}]
	}]
}

exports.deleteMenu = (ctx, next) => {
	return new Promise((resolve, reject) => {
		wx.fetchAccessToken()
			.then((access_token) => {
				const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${access_token}`
				request({url: url, json: true}).then((response) => {
					const _data = response


					console.log(11111111 ,access_token)
					if (_data) {
						resolve(_data)
					}
					else {
						throw new Error('Delete menu fails')
					}
				})
					.catch(function (err) {
						reject(err)
					})
			})
	})
}

exports.createMenu = (ctx, next) => {
	return new Promise((resolve, reject) => {
		wx.fetchAccessToken()
			.then((access_token) => {
				const url = ` https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`
				request({method: 'POST', url: url, body: menus, json: true}).then((response) => {
					const _data = response
					if (_data) {
						resolve(_data)
					}
					else {
						throw new Error('Create menu fails')
					}
				})
					.catch(function (err) {
						reject(err)
					})
			})
	})
}