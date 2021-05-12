require('dotenv').config();
const asyncHandler = require("../middleware/asyncHandler");
const moment = require('moment');

const {
    DB_TABLES: {
        DB_PURCHASINGS,
        DB_ITEMS
    },
} = require("../lib/const");

exports.getAllProducts = asyncHandler(async(req, res, next) => {
    const products = await DB_ITEMS.findAll({})

    let data = {
        sumOfProduct: 0,
        items:[]
    }

    if(products){
        data.sumOfProduct = products.length
        data.items = products.map(product => {
            return {
                id: product.id,
                name: product.name,
                desc: product.desc,
                price: product.price
            }
        })
    }

    res.jsend.success(data)
})

exports.getProduct = asyncHandler(async(req, res, next) => {
    const { product_id } = req.query

    const product = await DB_ITEMS.findOne({
        where:{
            id: product_id
        }
    })

    let data;
    if(product){
        data = {
            id: product.id,
            name: product.name,
            desc: product.desc,
            price: product.price
        }
    } else {
        return res.status(400).jsend.error({
            message: "Product not found",
        });
    }

    res.jsend.success(data)
})

exports.createProduct = asyncHandler(async(req, res, next) => {
    const {
        product_name,
        product_desc,
        product_price
    } = req.body
    const { id, privilegesId } = req.user

    if(privilegesId == 1){
        try {
            const createProd = await DB_ITEMS.create({
                usersId: id,
                name: product_name,
                desc: product_desc,
                price: product_price
            })

            res.jsend.success({
                message: "Product has been created."
            })
        } catch (error) {
            return res.status(400).jsend.error({
                message: "Failed! Product has not been created.",
            });
        }
    } else {
        return res.status(400).jsend.error({
            message: "User is not Admin.",
        });
    }
})

exports.updateProduct = asyncHandler(async(req, res, next) => {
    const {
        product_id,
        name,
        desc,
        price
    } = req.body
    const { id, privilegesId } = req.user

    const now = new Date()

    const product = await DB_ITEMS.findOne({
        where:{
            id: product_id
        }
    })

    if(privilegesId == 1 && product){
        product.name = name,
        product.desc = desc,
        product.price = price
        product.updatedAt = now
        await product.save()

        res.jsend.success({
            message: "Product has been updated."
        })
    } else {
        if(privilegesId != 1){
            return res.status(400).jsend.error({
                message: "User is not Admin.",
            });   
        }
        if(!product){
            return res.status(400).jsend.error({
                message: "Product not found.",
            });
        }
    }
})

exports.deleteProduct = asyncHandler(async(req, res, next) => {
    const {
        product_id
    } = req.body
    const { id, privilegesId } = req.user

    const findProduct = await DB_ITEMS.findOne({
        where:{
            id: product_id
        }
    })

    if(privilegesId == 1 && findProduct){
        findProduct.destroy()

        res.jsend.success({
            message: "Product has been deleted."
        })
    } else {
        if(privilegesId != 1){
            return res.status(400).jsend.error({
                message: "User is not Admin.",
            });   
        }
        if(!findProduct){
            return res.status(400).jsend.error({
                message: "Product not found.",
            });
        }
    }
})

exports.productBuy = asyncHandler(async(req, res, next) => {
    const {
        product_id,
        message
    } = req.body
    const { id } = req.user

    const product = await DB_ITEMS.findOne({
        where:{
            id: product_id
        }
    })

    if(product){
        try {
            const createPurchasing = await DB_PURCHASINGS.create({
                codeTransaction: `CODETR${moment().format('YYYYMMDD')}${product.id}${id}RILIV`,
                buyerId: id,
                itemsId: product.id,
                itemsName: product.name,
                itemsDesc: product.desc,
                price: product.price,
                message: message
            })

            res.jsend.success({
                message: "Product has been purchased."
            })
        } catch (error) {
            return res.status(400).jsend.error({
                message: "Failed! Product not been purchased.",
            });
        }
    } else {
        return res.status(400).jsend.error({
            message: "Product not found.",
        });
    }
})

exports.listTransactions = asyncHandler(async(req, res, next) => {
    const { id, privilegesId } = req.user

    let query = {
        where:{}
    }

    if(privilegesId != 1){
        query.where["buyerId"] = id
    }

    const transactions = await DB_PURCHASINGS.findAll({
        ...query
    })

    let data = {
        sumOfTransaction: 0,
        list: []
    }
    if(transactions){
        data.sumOfTransaction = transactions.length
        data.list = transactions.map(transaction => {
            return {
                id: transaction.id,
                codeTransaction: transaction.codeTransaction,
                buyerId: transaction.buyerId,
                productId: transaction.itemsId,
                name: transaction.itemsName,
                desc: transaction.itemsDesc,
                price: transaction.price,
                message: (transaction.message) ? transaction.message : null
            }
        })
    }

    res.jsend.success(data)
})