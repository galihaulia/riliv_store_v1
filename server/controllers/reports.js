require('dotenv').config();
const asyncHandler = require("../middleware/asyncHandler");

const {
    getDataProduct,
    getDataUsers,
    getDataIncome
} = require('../lib/helper')

exports.productRank = asyncHandler(async(req, res, next) => {
    const { id, privilegesId } = req.user

    if(privilegesId == 1){
        const data = await getDataProduct(req)
        res.jsend.success(data)
    } else {
        return res.status(400).jsend.error({
            message: "User is not Admin.",
        }); 
    }
})

exports.buyerRank = asyncHandler(async(req, res, next) => {
    const { id, privilegesId } = req.user

    if(privilegesId == 1){
        const data = await getDataUsers(req)
        res.jsend.success(data)
    } else {
        return res.status(400).jsend.error({
            message: "User is not Admin.",
        }); 
    }
})

exports.reportIncome = asyncHandler(async(req, res, next) => {
    const { id, privilegesId } = req.user

    if(privilegesId == 1){
        const data = await getDataIncome(req)
        res.jsend.success(data)
    } else {
        return res.status(400).jsend.error({
            message: "User is not Admin.",
        }); 
    }
})