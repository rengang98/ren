var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.connect('mongodb://fund:X4JyrjPypYPHvx7p@10.41.49.224:27017/fund')
var db = mongoose.connection
db.on('error', console.error.bind(console, '连接错误：'))
db.once('open', (callback) => {
    console.log('MongoDB连接成功！！')
})

var photoSchema = new Schema({
    _id:String,
    name:String,
    path:String
})

exports.Photo = mongoose.model('Photo',photoSchema)