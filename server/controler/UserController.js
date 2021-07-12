const { User } = require('../models/index')
const { comparePassword } = require('../utils/bcrypt')
const { signToken } = require('../utils/jwt')
const { uniqueString } = require('../helpers/uniqueString')
const { verfyEmail } = require('../utils/nodeMailer')
const { Op } = require('sequelize')
const { getPagination, getPagingData } = require('../helpers/pagination')


class UserController {
    static async signupUserHandler(req, res) {
        const { user_name, email, password, phone_number } = req.body
        const code = uniqueString(50)
        const userData = {
            user_name,
            email,
            password,
            phone_number,
            verfy_phone_number: false,
            role: 'owner',
            email_verfy_code: code,
            email_verfy_status: false
        }
        try {
            // emailVerfy(email)
            const findEmail = await User.findOne({ where: { email: email } })
            const findPhoneNumber = await User.findOne({ where: { phone_number: phone_number } })

            if (!findEmail && !findPhoneNumber) {
                const addEmploye = await User.create(userData)
                const sendEmail = await verfyEmail(email, code)
                return res.status(201).json({
                    statusCode: 201,
                    message: 'Success created user',
                    addEmploye,
                })


            } else {
                return res.status(401).json({
                    message: 'your email/phone number already exist'
                })
            }

        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: 'Error add user'
            })
        }

    }
    static async loginUserHandler(req, res) {
        const { email, password } = req.body

        try {
            if (email === null || email === null) {
                res.status(404).json({
                    statusCode: 400,
                    message: 'email/password cannot be empty'
                })
            } else {
                const findEmail = await User.findOne({ where: { email: email } })
                if (!findEmail || findEmail === null) {
                    res.status(404).json({
                        statusCode: 404,
                        message: 'wrong email/password'
                    })
                } else if (!comparePassword(password, findEmail.password)) {
                    res.status(404).json({
                        statusCode: 404,
                        message: 'wrong email/password'
                    })
                } else {
                    const access_token = await signToken({ id: findEmail.id, user_name: findEmail.user_name, role: findEmail.role, email: findEmail.email })
                    res.status(201).json({ access_token, name: findEmail.user_name })
                }
            }
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: 'Error login'
            })
        }
    }
    static async editUserNameHandler(req, res) {
        try {
            const id = req.params.id
            const role = req.userData.role
            if (role === 'owner') {
                const result = await User.update({ user_name: req.body.user_name }, { where: { id: id } })
                res.status(201).json({
                    statusCode: 201,
                    message: 'Success update user name',
                    data: result
                })
            } else {
                res.status(500).json({
                    statusCode: 500,
                    message: 'authentication error',
                })
            }

        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: 'Failed update user name',
            })
        }
    }
    static deleteUserHandler(req, res) {
    }
    static async getAllUserHandler(req, res) {
        const { page, size, email } = req.query;
        var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
        const { limit, offset } = getPagination(page, size);
        if (req.userData.role === 'big bos') {
            try {
                const getAll = await User.findAndCountAll({
                    where: condition, limit, offset
                })

                res.status(200).json({
                    statusCode: 200,
                    message: 'Success get all users',
                    dataUser: getPagingData(getAll, page, limit)
                })
            } catch (error) {
                res.status(500).json({
                    statusCode: 500,
                    message: 'Server error'
                })
            }
        } else {
            res.status(200).json({
                statusCode: 500,
                message: 'you not authenticated',
            })
        }
    }
    static async getUserByIdHandler(req, res) {
        const id = req.params.id
        const role = req.userData.role
        if (role === 'big bos') {
            try {
                const dataById = await User.findOne({ where: { id: id } })
                res.status(200).json({
                    statusCode: 200,
                    message: 'Success get user by id',
                    data: dataById
                })
            } catch (error) {
                res.status(500).json({
                    statusCode: 500,
                    message: 'Server error'
                })
            }
        } else {
            res.status(200).json({
                statusCode: 500,
                message: 'you not authenticated',
            })
        }
    }
    static async usesrVerfyCodeHandler(req, res) {
        try {
            const code = req.params.code
            const user = await User.findOne({ where: { email_verfy_code: code } })
            if (user) {
                const dataUser = {
                    ...user,
                    email_verfy_status: true
                }
                const updateStatusEmail = await User.update(dataUser, { where: { email_verfy_code: code } })
                res.status(200).json({
                    statusCode: 200,
                    message: 'Success veryfed email'
                })
            } else {
                res.status(500).json({
                    satusCode: 500,
                    message: 'User not fund'
                })
            }
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: 'Error veryfed email'
            })
        }
    }
    static userResetPassword(req, res) {

    }
    static UserGetOldPassword(req, res) {

    }
    static UserUpadateNewPassword(req, res) {

    }

}

module.exports = UserController