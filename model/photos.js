var mongoose = require('mongoose')
var Schema = mongoose.Schema

var photoSchema = new Schema({
    id:Number,
    name:String,
    path:String
})

exports.Photo = mongoose.model('Photo',photoSchema)