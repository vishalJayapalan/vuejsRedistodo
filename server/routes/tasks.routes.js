const express = require('express')
const Router = express.Router()
const taskController = require('../controllers/task.controller')

Router.get('/', taskController.getAllTasks)

Router.post('/', taskController.createNewTask)

Router.put('/:taskId', taskController.updateTask)

Router.delete('/:taskId', taskController.deleteTask)

module.exports = Router
