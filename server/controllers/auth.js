require('dotenv').config();
const {
    registerValidation,
    loginValidation,
    generateTokens,
    upsert
} = require("../lib/helper");
const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const {
    DB_TABLES: {
        DB_USERS,
        DB_TOKENS,
        DB_PRIVILEGEUSERS
    },
} = require("../lib/const");

exports.register = asyncHandler(async(req, res, next) => {
    const {
        email,
        password
    } = req.body
    const { error } = registerValidation(req.body);
    if(error){
        return res.status(400).jsend.error(error.details[0].message);
    }
    const newPass = bcrypt.hashSync(password, salt)
    const cekEmail = await DB_USERS.findOne({
        where:{
            email: email
        }
    })

    if(!cekEmail){
        try {
            const createUser = await DB_USERS.create({
                email: email.toLowerCase(),
                password: newPass,
                privilegesId: 2
            })
    
            const token = await generateTokens(createUser)
    
            const createToken = await DB_TOKENS.create({
                usersId: createUser.id,
                token: token
            })

            return res.jsend.success({
                message: "User has been created",
                token: token
            })
        } catch (error) {
            return res.status(400).jsend.error({
                message: "Email already exist",
            });
        }
    }
});

exports.login = asyncHandler(async(req, res, next) => {
    const {
        email,
        password
    } = req.body

    let token

    const { error } = loginValidation(req.body);
    if(error){
        return res.status(400).jsend.error(error.details[0].message);
    }

    const user = await DB_USERS.findOne({
        where: {
            email: email.toLowerCase()
        }
    })

    if(user){
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (checkPassword) {
            token = await generateTokens(user);
    
            const upSert = await upsert({
                token: token,
                usersId: user.id
            }, {
                usersId: user.id
            }, DB_TOKENS)
        } else {
            return res.status(400).jsend.error({
                message: "Password not match",
            });
        }
    } else {
        return res.status(400).jsend.error({
            message: "User not found",
        });
    }

    res.jsend.success({
        token: token
    })
})