const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const BlogSchema = new Schema({
    title: { type: String },
    description: { type: String },
    file: { type: String },
    user:{type:String, ref: 'register_collection'}
})

const blogmodel = mongoose.model('Blog_collection', BlogSchema)

module.exports = blogmodel