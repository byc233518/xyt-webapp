'use strict'

var mongoose = require('mongoose')
var Category = mongoose.model('Category')

// admin new page
exports.new = async (ctx, next) => {
  ctx.render('pages/category_admin', {
    title: 'imooc 后台分类录入页',
    category: {}
  })
}

// admin post movie
exports.save =  async (ctx, next) => {
  var _category = ctx.request.body.category
  var category = new Category(_category)

	await category.save()

  ctx.redirect('/nodeport/admin/category/list')
}

// catelist page
exports.list =  async (ctx, next) => {
  var catetories = await Category.find({}).exec()

  ctx.render('pages/categorylist', {
    title: 'imooc 分类列表页',
    catetories: catetories
  })
}
