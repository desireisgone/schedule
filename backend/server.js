import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import sequelize from './db.js'
import * as models from './models/models.js'
import routes from './routes/routes.js'
import executeAdbReverse from './adb.js'

const port = process.env.PORT || 5000
const hostname = process.env.HOSTNAME || ""
executeAdbReverse(port)

const app = express()
app.use(cors())
app.use('/api', routes)

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