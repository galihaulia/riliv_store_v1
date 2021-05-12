const util1 = require('../utils/apiBuildHandler')
const moment = require('moment')
const tag = "UserController"
const schema = {
    usersSchema : {
        title: "All Users",
        type: "object",
        properties: {
            sumOfUser: {
                type: "integer"
            },
            users: {
                type: "array",
                items: {
                    properties : {
                        id : {
                            type : "integer"
                        },
                        email : {
                            type : "string"
                        },
                    }
                }
            }
        }
    },
    userSchema:{
        title: "User",
        properties: {
            id: {
                type: "integer"
            },
            email: {
                type: "string"
            },
            token: {
                type: "string"
            }
        }
    }
}
const paths = {
    "/users": {
        get: {
            tags:[tag],
            parameters: [],
            responses: {
                200: {
                    description : "Users",
                    content: {
                        "application/json": {
                            schema: util1.getSchemaResponse("usersSchema","usersSchema","object")
                        }
                    }
                }
            }
        },
    },
    "/user": {
        get: {
            tags:[tag],
            parameters: [
                {
                    name: 'user_id',
                    in: 'query',
                    schema: {
                      type: 'integer'
                    },
                    required: false
                  }
            ],
            responses: {
                200: {
                    description : "User",
                    content: {
                        "application/json": {
                            schema: util1.getSchemaResponse("userSchema","userSchema","object")
                        }
                    }
                }
            }
        },
        // post: {
        //     tags: [tag],
        //     requestBody: {
        //         content: {
        //             "application/json":{
        //                 schema: util1.getSchemaRequest("userCreation")
        //             }
        //         }
        //     },
        //     responses: {
        //         200 : {
        //             description: "User Creation",
        //             content: {
        //                 "application/json":{
        //                     schema: {
        //                         properties: {
        //                             message: {
        //                                 type: "string"
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // },
        // put: {
        //     tags: [tag],
        //     requestBody: {
        //         content: {
        //             "application/json":{
        //                 schema: util1.getSchemaRequest("userModification")
        //             }
        //         }
        //     },
        //     responses: {
        //         200 : {
        //             description: "User Modification",
        //             content: {
        //                 "application/json":{
        //                     schema: {
        //                         properties: {
        //                             message: {
        //                                 type: "string"
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // },
        // delete: {
        //     tags: [tag],
        //     requestBody: {
        //         content: {
        //             "application/json":{
        //                 schema: util1.getSchemaRequest("userDeletion")
        //             }
        //         }
        //     },
        //     responses: {
        //         200 : {
        //             description: "User Deletion",
        //             content: {
        //                 "application/json":{
        //                     schema: {
        //                         properties: {
        //                             message: {
        //                                 type: "string"
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}

exports.default = {schema,paths}