'use strict'

var mongoose = require('mongoose')
var Comment = mongoose.model('Comment')

// comment
exports.save =  async (ctx, next) =>  {
  var _comment = ctx.request.body.comment
  var movieId = _comment.movie

  if (_comment.cid) {
    let comment = await Comment.findOne({
      _id: _comment.cid
    }).exec()

    var reply = {
      from: _comment.from,
      to: _comment.tid,
      content: _comment.content
    }

    comment.reply.push(reply)
    await comment.save()

    this.body = {success: 1}
  }
  else {
    let comment = new Comment({
      movie: _comment.movie,
      from: _comment.from,
      content: _comment.content
    })

    await comment.save()
    this.body = {success: 1}
  }
}
