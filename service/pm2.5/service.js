var request = require('request')
var cheerio = require('cheerio')
function getInfo(){
    return new Promise ((resolve,reject)=>{
        let option = {
            url:"http://www.pm25.in/beijing",
            headers:{
                "Host":"www.pm25.in",
                "Connection":"keep-alive",
                "Upgrade-Insecure-Requests":"1",
                "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
                "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "Referer":"http://www.pm25.in/",
                //"Accept-Encoding":"gzip, deflate",
                "Accept-Language":"zh-CN,zh;q=0.9",
                // "Cookie":"_aqi_query_session=BAh7CEkiD3Nlc3Npb25faWQGOgZFRkkiJTYxMmE1ODhhZWRkYzRhOTAzZGQ3ZGIzYjE3ZGM2YTc3BjsAVEkiDGNhcHRjaGEGOwBGIi03NmU5ZGFiNjU3NjEwZTMwZGYzZmZjNDZjOTQwYTM2NTY1NGIyN2Q4SSIQX2NzcmZfdG9rZW4GOwBGSSIxL1Y1MTM1blRDRVVWQmR1N2R4cjhJU000d1krdU96MU8wTGtBOVlxZC85az0GOwBG--4e5872d3e143b144c20561651e5af499d950de8b; __utma=162682429.1072228159.1551769488.1551769488.1551769488.1; __utmc=162682429; __utmz=162682429.1551769488.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __utmt=1; __utmb=162682429.2.10.1551769488"
            }
        }
        request(option,  function dealInfo(err,res,body) {
            if (res.status<200||res.status>=300||err){
                reject({"状态码：":res.status?res.status:500,"错误信息：":err?err:"未知"})
            }
            var $ = cheerio.load(body)
            var resBody = $('table[class="table table-striped table-bordered table-condensed"]').toString()
            resolve(resBody)
        })
    })

}

module.exports = {
    getInfo
}
