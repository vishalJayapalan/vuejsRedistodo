const express = require('express')
const Router = express.Router()
const listRouter = require('./list.routes')
const taskRouter = require('./task.routes')

Router.use('/list', listRouter)

Router.use('/task', taskRouter)

module.exports = Router
