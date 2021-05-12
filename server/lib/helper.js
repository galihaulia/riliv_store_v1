const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi');
const secretKey = process.env.JWT_SECRET;
const expired = process.env.JWT_EXPIRE;
const { sequelize } = require('../models');
const asyncHandler = require('../middleware/asyncHandler');

exports.registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data)
};

exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required() 
    });
    return schema.validate(data);
};

exports.generateTokens = async (user) => {
    const token = jwt.sign({
            id: user.id,
        },
        secretKey, {
            expiresIn: expired,
        }
    );
    return token;
};

exports.upsert = async(values, condition, MODEL) => {
    return MODEL.findOne({
        where: condition,
    }).then(function (obj) {
        if (obj) return obj.update(values);
    
        return MODEL.create(values);
    });
}

exports.getDataProduct = async(req) => {
    const {
        pagination,
        limit
    } = req.query

    let pageQuery = ``

    pageQuery = (pagination) ? pageQuery.concat(' ', `OFFSET ${parseInt(pagination - 1) * limit} LIMIT ${parseInt(limit)}`) : pageQuery;

    const [results, metadata] = await sequelize.query(`
        SELECT  items.*,
                COUNT(*) OVER () AS counter
        FROM (SELECT    item."id",
                        item."name",
                        COUNT(p."itemsId") AS sumOfPurchasing,
                        DENSE_RANK () OVER (ORDER BY COUNT(p."itemsId") DESC) ranking
            FROM "Items" AS item
            INNER JOIN "Purchasings" AS p ON p."itemsId" = item."id"
            GROUP BY item."id"
        ) AS items ${pageQuery}
    `, {raw: true})

    let data = {
        sumOfProducts: 0,
        products: []
    }

    if(metadata.rowCount > 0){
        const { rows: items } = metadata
        const[item] = items
        if(items){
            data.sumOfProducts = (item.counter) ? parseInt(item.counter) : 0,
            data.products = items.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    sumOfPurchasing: item.sumofpurchasing,
                    ranking: item.ranking
                }
            })
        }
    }

    return data
}

exports.getDataUsers = async(req) => {
    const {
        pagination,
        limit
    } = req.query

    let pageQuery = ``

    pageQuery = (pagination) ? pageQuery.concat(' ', `OFFSET ${parseInt(pagination - 1) * limit} LIMIT ${parseInt(limit)}`) : pageQuery;

    const [results, metadata] = await sequelize.query(`
    SELECT  users.*,
            COUNT(*) OVER () AS counter
        FROM (SELECT    "user"."id",
                        "user"."email",
                        COUNT(p."buyerId") AS sumOfPurchasing,
                        DENSE_RANK () OVER (ORDER BY COUNT(p."buyerId") DESC) ranking
            FROM "Users" AS "user"
            INNER JOIN "Purchasings" AS p ON p."buyerId" = "user"."id"
            WHERE "user"."privilegesId" != 1
            GROUP BY "user"."id"
        ) AS users ${pageQuery}
    `, {raw: true})

    let data = {
        sumOfUsers: 0,
        users: []
    }

    if(metadata.rowCount > 0){
        const { rows: users } = metadata
        const[user] = users
        if(users){
            data.sumOfUsers = (user.counter) ? parseInt(user.counter) : 0,
            data.users = users.map(user => {
                return {
                    id: user.id,
                    email: user.email,
                    sumOfPurchasing: user.sumofpurchasing,
                    ranking: user.ranking
                }
            })
        }
    }

    return data
}

exports.getDataIncome = async(req) => {
    const {
        past_date,
        now_date
    } = req.query

    let timeQuery = ``

    timeQuery = (past_date && now_date) ? timeQuery.concat(' ', `WHERE p."updatedAt" BETWEEN '${past_date}' AND '${now_date}'`) : timeQuery;

    const [results, metadata] = await sequelize.query(`
        SELECT  purchasings.*
        FROM (SELECT    SUM(p."price") AS income
            FROM "Purchasings" AS p
            ${timeQuery}
        ) AS purchasings
    `, {raw: true})

    let data = {
        income: 0
    }

    if(metadata.rowCount > 0){
        const { rows: purchasings } = metadata
        const[user] = purchasings
        data.income = (user.income) ? user.income : 0
    }

    return data
}