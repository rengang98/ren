var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    //如果想写一个快速测试页，当然可以使用res.send()。这个函数将根据内容，自动帮我们设置了Content-Type头部和200状态码。send()只能用一次，和end一样。和end不一样在哪里？能够自动设置MIME类型。
    // 如果想使用不同的状态码，可以使用(加状态码打点)
    res.status(200).set('Content-Type', 'text/html').send('respond with a resource');
});

module.exports = router;
