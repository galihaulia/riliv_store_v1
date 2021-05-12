const express = require("express");
const { authenticate } = require("../middleware/auth")
const router = express.Router();
const {
    productRank,
    buyerRank,
    reportIncome
} = require("../controllers/reports");

router.get("/report-products", authenticate, productRank);
router.get("/report-buyers", authenticate, buyerRank);
router.get("/report-income", authenticate, reportIncome);

module.exports = router;