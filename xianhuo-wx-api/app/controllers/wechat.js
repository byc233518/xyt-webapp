'use strict'

var wechat = require('../../wechat/g')
var reply = require('../../wx/reply')
var wx = require('../../wx/index')

exports.hear = async(ctx, next) => {
  console.log(ctx.method)

  ctx.middle = wechat(wx.wechatOptions.wechat, reply.reply)

  ctx.middle(next)
}
