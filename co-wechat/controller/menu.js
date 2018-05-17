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
			'name': '闲活官网',
			'type': 'click',
			'key': 'index'
		}]
	}, {
		'name': '我的闲活',
		'sub_button': [{
			'name': '绑定账号',
			'type': 'click',
			'key': 'bind_account'
		}, {
			'name': '刷新简历',
			'type': 'click',
			'key': 'refresh_resume'
		}]
	}, {
		'name': '招聘中心',
		'sub_button': [{
			'name': '免费发布职位',
			"type":"view",
			"url":"http://xetong.cn/xianhuo-webapp/#/publishjob"
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
					if (_data) {
						console.log('删除菜单成功')
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
						console.log('创建菜单成功')
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