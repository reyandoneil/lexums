const nodemailer = require('nodemailer')
const EMAILPASSWORD = process.env.EMAILPASSWORD
const EMAIL = process.env.EMAIL

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: EMAILPASSWORD
    }
})


const verfyEmail = (email, uniqueStr) => {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'verfy your email',
        text: 'Email confirmation',
        html: 'press' + `<a href=http://localhost:5001/>user/verfy/${uniqueStr}>your link </a> </a>` + 'to verfy your email, Thanks sob.. '
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)

        } else {
            console.log(info)

        }
    })
}

const loginSendEmail = (email) => {

}

module.exports = {
    verfyEmail,
    loginSendEmail
}