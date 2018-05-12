'use strict'

var mongoose = require('mongoose')
var User = mongoose.model('User')
var Comment = mongoose.model('Comment')
var wx = require('../../wx/index')
var util = require('../../libs/util')
var Movie = require('../api/movie')
var options = require('../../options.json')
var request = require('request')

exports.guess = async (ctx, next) => {
  var wechatApi = wx.getWechat()
  var data = await wechatApi.fetchAccessToken()
  var access_token = data.access_token
  var ticketData = await wechatApi.fetchTicket(access_token)
  var ticket = ticketData.ticket
  var url = this.href.replace(':8000', '')
  var params = util.sign(ticket, url)

  ctx.render('wechat/game', params)
}


exports.jump = async (ctx, next) => {
  var movieId = ctx.params.id
  var redirect = encodeURIComponent(options.baseUrl + '/wechat/movie/' + movieId)
  // var redirect = options.baseUrl + '/wechat/movie/' + movieId
  var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + options.appID + '&redirect_uri=' + redirect + '&response_type=code&scope=snsapi_base&state=' + movieId + '#wechat_redirect'

  this.redirect(url)
}


exports.find = async (ctx, next) => {
  var code = ctx.query.code
  var openUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + options.appID + '&secret=' + options.appSecret + '&code=' + code + '&grant_type=authorization_code'

  var response = await request({
    url: openUrl
  })
  var body = JSON.parse(response.body)
  var openid = body.openid
  var user = await User.findOne({openid: openid}).exec()

  if (!user) {
    user = new User({
      openid: openid,
      password: 'imoocimooc',
      name: Math.random().toString(36).substr(2)
    })

    user = await user.save()
  }

  this.session.user = user
  this.state.user = user

  var id = this.params.id
  var wechatApi = wx.getWechat()
  var data = await wechatApi.fetchAccessToken()
  var access_token = data.access_token
  var ticketData = await wechatApi.fetchTicket(access_token)
  var ticket = ticketData.ticket
  var url = this.href.replace(':8000', '')
  var params = util.sign(ticket, url)
  var movie = await Movie.searchById(id)
  var comments = await Comment
    .find({movie: id})
    .populate('from', 'name')
    .populate('reply.from reply.to', 'name')
    .exec()

  params.movie = movie
  params.comments = comments

  ctx.render('wechat/movie', params)
}
