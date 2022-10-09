const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dbConnect = require('./utils/dbConnect')
const swaggerUI = require('swagger-ui-express')
const yamljs = require('yamljs')

const routesV1 = require('./routes/routesV1')
const errorHandler = require('./middleware/errorHandler')
const validationErrorHandler = require('./middleware/validationErrorHandler')


const app = express()

dbConnect.connect(app)

app.use(cors())


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(yamljs.load('./swaggerdoc.yaml')))

app.use('/api/v1', express.json(), routesV1)

app.use(validationErrorHandler)
app.use(errorHandler)


const port = process.env.PORT || 3000
app.listen(port, () => console.log(process.uptime()))

console.log('Listening on ' + port)


module.exports = app
