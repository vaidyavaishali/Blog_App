const express = require('express')
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const app = express();
const dotenv = require('dotenv')
const cors = require("cors")
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const { body, validationResult } = require('express-validator')
const Login_route = require('./routes/RegisterRoute')
const Blog_route = require('./routes/BlogRoute')
app.use(bodyparser.json())
app.use(cors())
dotenv.config()
const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("connect to db")
})
// app.use(
//     cors({
//         origin: "*",
//     })
// )
// app.get('/', (req, res)=>{
//  res.send("ok")
// })

app.use('/api/v1/posts', (req, res, next) => {
    try{
        const token = req.headers.authorization
   
        if (token) {
          let decoded=   jwt.verify(token, "AUTH")
          console.log(decoded.data)
                    req.user = decoded.data,
                        next();
                }
        else {
            res.json({
                status: "Failed",
                result: "Token is Missing",
            })
        }
    }catch(e){
        res.json({
            status: "Failed",
            result: e.message
        })
    }
    // console.log(req.headers.authorization)
    
})


app.use('/', Login_route)
app.use('/', Blog_route )

app.listen(process.env.PORT, () => {
    console.log(`listening to ${PORT}`)
})
