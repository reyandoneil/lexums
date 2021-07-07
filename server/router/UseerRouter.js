const route = require('express').Router()
const {
    signupUserHandler,
    deleteUserHandler,
    loginUserHandler,
    usesrVerfyCodeHandler,
    getAllUserHandler,
    getUserByIdHandler
} = require('../controler/UserController')
const authentication = require('../utils/authentication')

const rateLimit = require('express-rate-limit')
const limit = rateLimit({
    windowMs: 5 * 60 * 1000,//5 minutes
    max: 5
})

route.post('/login', limit, loginUserHandler)
route.post('/signup', limit, signupUserHandler)
route.use(authentication)
route.delete('/delete', deleteUserHandler)
route.patch('/edit/:id')
route.get('/getUserId/:id', getUserByIdHandler)
route.get('/verfy/:code', usesrVerfyCodeHandler)
route.get('/getAllUser', getAllUserHandler)


module.exports = route

