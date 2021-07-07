
const uniqueString = (length) => {
    let result = ''
    const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwzyz!@#&123456789'
    let characterLength = character.length
    for (let i = 0; i < length; i++) {
        result += character.charAt(Math.floor(Math.random() * characterLength))
    }

    return result
}

module.exports = {
    uniqueString
}