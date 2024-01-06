require('dotenv').config()
const express = require('express')
const sqlite3 = require('sqlite3')
const cors = require('cors')

const app = express()
app.use(cors());

const port = process.env.PORT || 5000
const hostname = process.env.HOSTNAME || ""

const db = new sqlite3.Database('./schedule.db')

app.get('/groups/:id', (req, res) => {
  const id_group = req.params.id
  const query = `SELECT * FROM schedule WHERE id_groups = ${id_group}`

  db.all(query, (error, rows) => {
    if (error) {
      res.status(500).json({ error: error.message })
      return
    }
    res.json(rows)
  })
})

app.listen(port, hostname, () => {
  console.log(port)
})