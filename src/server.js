const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const swaggerUI = require("swagger-ui-express")
const yamljs = require('yamljs')

const routesV1 = require('./routes/routesV1')
const errorHandler = require('./middleware/errorHandler')

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online forum api",
      description: "Restful CRUD API for an online forum",
    }
  },
  apis: ["./src/routes/*.js"]
}

mongoose.connect(process.env.DB_URI, {autoIndex: true})
  .catch(e => console.log(e))
require('./models/banModel')
require('./models/categoryModel')
require('./models/postModel')
require('./models/threadModel')
require('./models/userModel')
const app = express()

app.use(cors())


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(yamljs.load('./swaggerdoc.yaml')))

app.use('/api/v1', express.json(), routesV1)


app.use(errorHandler)



const port = process.env.PORT || 3000
app.listen(port)
console.log('Listening on ' + port);
