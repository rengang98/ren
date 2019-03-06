var express = require('express');
var router = express.Router();
var pm = require('../service/pm2.5/service')
/* GET users listing. */

router.get('/',function (req,res,next) {
    res.render('pm25',{title:'PM2.5查询'})
})

router.post('/', async function (req, res, next) {
    //如果想写一个快速测试页，当然可以使用res.send()。这个函数将根据内容，自动帮我们设置了Content-Type头部和200状态码。send()只能用一次，和end一样。和end不一样在哪里？能够自动设置MIME类型。
    // 如果想使用不同的状态码，可以使用(加状态码打点)
    let pmBody = await pm.getInfo(req.body.city)
    // console.error(pmBody)
    res.send(pmBody)
});

module.exports = router;
