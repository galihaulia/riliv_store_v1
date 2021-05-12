require('dotenv').config();
const asyncHandler = require("../middleware/asyncHandler");

const {
    DB_TABLES: {
        DB_USERS,
        DB_PRIVILEGES
    },
} = require("../lib/const");

exports.getAllUsers = asyncHandler(async(req, res, next) => {
    const users = await DB_USERS.findAll({
        include:[
            {
                model: DB_PRIVILEGES,
                as: 'privilege'
            }
        ]
    })

    let data = {
        sumOfUsers: 0,
        users: []
    }

    if(users){
        data.sumOfUsers = users.length
        data.users = users.map(user => {
            return {
                id: user.id,
                email: user.email,
                privilege: user.privilege.name
            }
        })
    }

    res.jsend.success(data)
})

exports.getDataUser = asyncHandler(async(req, res, next) => {
    const { user_id } = req.query
    const { id } =  req.user

    let usersId;
    if(user_id){
        usersId = user_id
    } else {
        usersId = id
    }

    const user = await DB_USERS.findOne({
        where: {
            id: usersId
        },
        include:[
            {
                model: DB_PRIVILEGES,
                as: 'privilege'
            }
        ]
    })

    let data;
    if(user){
        data = {
            id: user.id,
            email: user.email,
            privilege: user.privilege.name
        }
    } else {
        return res.status(400).jsend.error({
            message: "User not found",
        });
    }
    
    res.jsend.success(data)
})