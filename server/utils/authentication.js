const { verifyToken } = require('./jwt')
const { User } = require('../models')

const authentication = (req, res, next) => {
    const { access_token } = req.headers
    
    let decoded
    if (access_token) {
        try {
            decoded = verifyToken(access_token)
        } catch (error) {
            return res.status(403).json({ message: 'Invalid access token' })
        }
    } else {
        res.status(403).json({ message: 'login needed' })
    }
    User.findOne({ where: { id: decoded.id } })
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'user not found' })
            } else {
                req.userData = decoded
                next()
            }
        })
}

module.exports = authentication