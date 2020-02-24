const express = require('express')
const port = 3000 // make it only to 3000 if env not used
const app = express()
const routes = require('./server/routes/index.routes')

app.use(express.json())
app.use('/', routes)

app.listen(port, () => console.log(`App is running on port ${port}`))
