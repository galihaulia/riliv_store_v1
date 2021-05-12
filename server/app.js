const express = require('express')
const cors = require('cors')
const jsend = require('jsend')
const path = require('path')
const app = express()
const router = express.Router()
const swaggerUI = require('swagger-ui-express')
const openApiDoc = require('./openApiDoc')
const bodyParser = require('body-parser')

//ROUTE PATH
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
const itemsRoute = require('./routes/items')
const reportsRoute = require('./routes/reports')

const publicPath = path.join(__dirname,'../public')
//MIDDLEWARE
app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }))
app.use(jsend.middleware)
app.use(express.static('uploads'))

//ROUTES
router.use(authRoute)
router.use(usersRoute)
router.use(itemsRoute)
router.use(reportsRoute)

app.use('/api/v1',router)
app.use('/api-doc',swaggerUI.serve,swaggerUI.setup(openApiDoc.default()))
app.get('*', (req, res, next) => {
    res.status(200).json({
        message: "Server clev ON",
        status: 200
    })
})

// SWAGGER
// ROUTE PATH

// ROUTES
console.log(publicPath)
module.exports = app