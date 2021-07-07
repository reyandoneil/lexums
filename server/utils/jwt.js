const { verify, sign } = require('jsonwebtoken')
const RAHASIA = process.env.RAHASIA

const signToken = (payload) => {
    const token = sign(payload, RAHASIA)
    return token
}

const verifyToken = (token) => {
    const verifyed = verify(token, RAHASIA)
    // console.log(verifyed);
    return verifyed
}

module.exports = {
    signToken,
    verifyToken
}