require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const models = require('./models/models')
const port = process.env.PORT || 5000
const hostname = process.env.HOSTNAME || ""

const app = express()
app.use(cors())

const startServer = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(port, hostname, () => { console.log(port) })
  }
  catch (e) {
    console.log(e)
  }
}

startServer()