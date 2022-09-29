const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const errorHandler = require('./middleware/errorHandler')

mongoose.connect(process.env.DB_URI, {autoIndex: true})
  .catch(e => console.log(e))
require('./models/banModel')
require('./models/categoryModel')
require('./models/postModel')
require('./models/threadModel')
require('./models/userModel')

const app = express()

app.use(cors())


const routesV1 = require('./routes/routesV1')
app.use('/api/v1', express.json(), routesV1)

app.use(errorHandler)





const port = process.env.PORT || 3000
app.listen(port)
console.log('Listening on ' + port);
