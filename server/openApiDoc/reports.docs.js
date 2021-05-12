const util1 = require('../utils/apiBuildHandler')
const moment = require('moment')
const tag = "ReportController"
const schema = {
    reportBuyersSchema : {
        title: "Report Products Ranking",
        type: "object",
        properties: {
            sumOfProducts: {
                type: "number"
            },
            products: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: {
                            type: "number"
                        },
                        name: {
                            type: "string"
                        },
                        sumOfPurchasing: {
                            type: "string"
                        },
                        ranking: {
                            type: "string"
                        }
                    }
                }
            }
        }
    },
    reportBuyersSchema : {
        title: "Report Buyers Ranking",
        type: "object",
        properties: {
            sumOfUsers: {
                type: "number"
            },
            users: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: {
                            type: "number"
                        },
                        email: {
                            type: "string"
                        },
                        sumOfPurchasing: {
                            type: "string"
                        },
                        ranking: {
                            type: "string"
                        }
                    }
                }
            }
        }
    },
    reportIncomeSchema : {
        title: "Report Income",
        type: "object",
        properties: {
            income: {
                type: "string"
            }
        }
    }
}
const paths = {
    "/report-products": {
        get: {
            tags:[tag],
            parameters: [],
            responses: {
                200: {
                    description : "Report Products Ranking",
                    content: {
                        "application/json": {
                            schema: util1.getSchemaResponse("reportBuyersSchema","reportBuyersSchema","object")
                        }
                    }
                }
            }
        },
    },
    "/report-buyers": {
        get: {
            tags:[tag],
            parameters: [],
            responses: {
                200: {
                    description : "Report Buyers Ranking",
                    content: {
                        "application/json": {
                            schema: util1.getSchemaResponse("reportBuyersSchema","reportBuyersSchema","object")
                        }
                    }
                }
            }
        },
    },
    "/report-income": {
        get: {
            tags : [tag],
            parameters: [
                {
                    name: 'past_date',
                    in: 'query',
                    schema: {
                      type: 'string',
                      example: moment().format('YYYY-MM-DD HH:mm:ss')
                    }
                },
                {
                    name: 'now_date',
                    in: 'query',
                    schema: {
                      type: 'string',
                      example: moment().format('YYYY-MM-DD HH:mm:ss')
                    }
                }
            ],
            responses: {
                200: {
                    description : "Report Income",
                    content: {
                        "application/json": {
                            schema: util1.getSchemaResponse("reportIncomeSchema","reportIncomeSchema","object")
                        }
                    }
                }
            }
        }
    }
}

exports.default = {schema,paths}