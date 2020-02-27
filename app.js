const express = require('express')
const port = 3000
const app = express()
const cors = require('cors')
const routes = require('./server/routes/index.routes')

app.use(cors())
app.use(express.json())
app.use('/', routes)

app.listen(port, () => console.log(`App is running on port ${port}`))
