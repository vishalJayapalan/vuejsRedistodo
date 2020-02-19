const express = require('express')
// const dotenv = require('dotenv').config()
const port = process.env.APP_PORT || 3000 // make it only to 3000 if env not used
const app = express()
const routes = require('./server/routes/index.routes')

app.use(express.json())
app.use('/', routes)

app.listen(port, () => console.log(`Server is running on port ${port}`))
