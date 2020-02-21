const express = require('express')
const Router = express.Router()
const listRouter = require('./list.routes')
const taskRouter = require('./tasks.routes')

Router.use('/list', listRouter)

Router.use('/tasks', taskRouter)

module.exports = Router
