var express = require('express')
var router = express.Router()
var photoModel = require('../model/photos').Photo
var uuid = require('uuid')

// 显示所有照片
//实质上res.render用来渲染模板文件,和view做交互
// 首页
router.get('/', (req, res, next) => {
    photoModel.find({}, (err, result) => {
        if (err) return console.log(err)
        console.log(result)
        res.render('photos', {title: "图片显示", photos: result})
    })
})
// 增加照片
router.get('/create', (req, res, next) => {
    res.render('photos/create', {title: "添加图片"})
})
router.post('/create', (req, res, next) => {
    let newPhoto = [{
        _id: uuid.v4(),
        name: req.body.name,
        path: req.body.path
    }]
    photoModel.create(newPhoto, (err) => {
        if (err) return console.log(err)
        res.send("<a href='/photos'>添加成功，点击返回首页</a>")
    })
})
// 删除照片
router.get('/del', (req, res, next) => {
    photoModel.remove({_id: req.query.id}, (err, result) => {
        if (err) return console.log(err)
        console.log(result.result)
        res.send("<a href='/photos'>删除成功，点击返回首页</a>")
    })
})
router.post('/del', (req, res, next) => {
    photoModel.remove({_id: req.body.id}, (err, result) => {
        if (err) return console.log(err)
        console.log(result.result)
        res.send("<a href='/photos'>删除成功，点击返回首页</a>")
    })
})
// 修改照片
router.get('/update', (req, res, next) => {
    let response = res
    photoModel.find({}, (err, result, res) => {
        if (err) return console.log(err)
        response.render('photos/update', {result})
    })
})
router.post('/update', (req, res, next) => {
    console.log(req.body)
    let condiction = {_id: req.body.id},
        query = {$set: {name: req.body.name, studentId: req.body.path}}
    photoModel.update(condiction, query, (err, result) => {
        if (err) {
            console.log(err)
            res.send('<script>alert("请勾选待修改的照片")</script>')
        }
        res.send("<a href='/'>修改成功，点击返回首页</a>")
    })
})
// 查找照片
router.get('/search', (req, res, next) => {
    // let result = null
    res.render('photos/search', {title: '查找图片'})
})
router.post('/search', (req, res, next) => {
    console.log(req.body)
    let response = res
    photoModel.find({name: req.body.name}, (err, result) => {
        console.log(result)
        if (err) return console.log(err)
        response.render('photos', {title: "查找结果", photos: result})
    })
})


// router.get('/', list)

module.exports = router