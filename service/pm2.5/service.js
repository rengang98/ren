var request = require('request')
var cheerio = require('cheerio')
var request = require('syncrequest')

function getInfo(city){
    let resInit = request.sync("http://www.pm25.in")
    var $ = cheerio.load(resInit.body)
    let href = null
    $('li a').map(function (i,ele) {
        if (ele.children[0].data == city) href = ele.attribs.href
    })
    if (href==null) return "输入有误，请确认"
    let res = request.sync("http://www.pm25.in"+href)
    $ = cheerio.load(res.body)
    return $('table[class="table table-striped table-bordered table-condensed"]').toString()

}

module.exports = {
    getInfo
}
