const route = require('express').Router()
const userRouter = require('../router/UseerRouter')

route.get('/',(req,res) => {
    res.send('welcome..')
})

route.use('/user',userRouter)

module.exports = route