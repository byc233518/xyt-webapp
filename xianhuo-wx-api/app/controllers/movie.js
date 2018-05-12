'use strict'

var mongoose = require('mongoose')
var Movie = mongoose.model('Movie')
var Category = mongoose.model('Category')
var Comment = mongoose.model('Comment')
var _ = require('lodash')
var path = require('path')

// detail page
exports.detail = async(ctx, next) => {
  var id = this.params.id

  await Movie.update({_id: id}, {$inc: {pv: 1}}).exec()

  var movie = await Movie.findOne({_id: id}).exec()
  var comments = await Comment
    .find({movie: id})
    .populate('from', 'name')
    .populate('reply.from reply.to', 'name')
    .exec()

	ctx.render('pages/detail', {
    title: 'imooc 详情页',
    movie: movie,
    comments: comments
  })
}

// admin new page
exports.new = async (ctx, next) => {
  var categories = await Category.find({}).exec()

  ctx.render('pages/admin', {
    title: 'imooc 后台录入页',
    categories: categories,
    movie: {}
  })
}

// admin update page
exports.update = async (ctx, next) => {
  var id = ctx.params.id

  if (id) {
    var movie = await Movie.findOne({_id: id}).exec()
    var categories = await Category.find({}).exec()

    ctx.render('pages/admin', {
      title: 'imooc 后台更新页',
      movie: movie,
      categories: categories
    })
  }
}

var util = require('../../libs/util')

// admin poster
exports.savePoster = async (ctx, next) => {
  var posterData = ctx.request.body.files.uploadPoster
  var filePath = posterData.path
  var name = posterData.name

  if (name) {
    var data = await util.readFileAsync(filePath)
    var timestamp = Date.now()
    var type = posterData.type.split('/')[1]
    var poster = timestamp + '.' + type
    var newPath = path.join(__dirname, '../../', '/public/upload/' + poster)

    await util.writeFileAsync(newPath, data)

    this.poster = poster
  }

  await next
}

// admin post movie
exports.save = async (ctx, next) => {
  var movieObj = ctx.request.body.fields || {}
  var _movie

  if (this.poster) {
    movieObj.poster = this.poster
  }

  if (movieObj._id) {
    var movie = await Movie.findOne({_id: movieObj._id}).exec()

    _movie = _.extend(movie, movieObj)
    await _movie.save()

    this.redirect('/nodeport/movie/' + movie._id)
  }
  else {
    _movie = new Movie(movieObj)

    var categoryId = movieObj.category
    var categoryName = movieObj.categoryName

    await _movie.save()

    if (categoryId) {
      let category = await Category.findOne({_id: categoryId}).exec()

      category.movies.push(movie._id)
      await category.save()

      this.redirect('/nodeport/movie/' + movie._id)
    }
    else if (categoryName) {
      let category = new Category({
        name: categoryName,
        movies: [movie._id]
      })

      await category.save()
      movie.category = category._id
      await movie.save()

      this.redirect('/nodeport/movie/' + movie._id)
    }
  }
}

// list page
exports.list = async (ctx, next) => {
  var movies = await Movie.find({})
    .populate('category', 'name')
    .exec()

  ctx.render('pages/list', {
    title: 'imooc 列表页',
    movies: movies
  })
}

// list page
exports.del = async (ctx, next) => {
  var id = this.query.id

  if (id) {
    try {
      await Movie.remove({_id: id}).exec()

      this.body = {success: 1}
    }
    catch(err) {
      this.body = {success: 0}
    }
  }
}
