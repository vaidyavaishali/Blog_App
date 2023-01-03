const express = require('express')
const BlogData = require("../models/BlogSchema")
const blog_route = express.Router()
const bodyparser = require("body-parser")

blog_route.use(bodyparser.json())

blog_route.post('/api/v1/posts', async (req, res) => {
    try {
        console.log(req.body)

        const users = await BlogData.create({
            title: req.body.title,
            description: req.body.description,
            file: req.body.file,
            user: req.user
        })
        res.json({
            status: "post created successfully",
            users
        })
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }

})

blog_route.get('/api/v1/posts', async (req, res) => {
    try {
        const users = await BlogData.find({ user: req.user })
        console.log(users)
        // console.log(blog_posts)
        if (users.length) {
            res.json({
                users
            })
        } else {
            res.status(400).json({
                status: "failed",
                message: "Post not available"
            })
        }
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})
module.exports = blog_route