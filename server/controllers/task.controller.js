const { get, incr, hset, hexists, hget } = require('../models/todo.models')

const getAllTasks = async (req, res) => {
  try {
    const { listId } = req.params
    let tasks = await hexists(listId, 'listName')
    if (!tasks) {
      return res
        .status(404)
        .json({ error: 'The list you are looking for doesnot exist' })
    }
    tasks = await hget(listId, 'todos')
    tasks = JSON.parse(tasks)
    res.status(200).json({ taskCount: tasks.length, tasks: tasks })
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while connecting. Please try again later'
    })
  }
}

const createNewTask = async (req, res) => {
  try {
    const { listId } = req.params
    const { tname } = req.body
    if (!(await hexists(listId, 'todos'))) {
      return res
        .status(404)
        .json({ error: 'The list you are looking for doesnot exist' })
    }
    const taskId = await get('taskIdCounter')
    const task = {
      taskId: taskId,
      tname: tname,
      checked: false,
      priority: 0,
      date: false,
      notes: ''
    }
    let tasks = await hget(listId, 'todos')
    tasks = JSON.parse(tasks)
    tasks.push(task)
    const newTask = await hset(listId, 'todos', JSON.stringify(tasks))
    await incr('taskIdCounter')
    res.status(201).json({ task: task })
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while connecting. Please try agin later'
    })
  }
}

const updateTask = async (req, res) => {
  try {
    const { listId } = req.params
    const { tasks } = req.body
    if (!(await hexists(listId, 'todos'))) {
      return res
        .status(404)
        .json({ error: 'The list you are looking for doesnot exist.' })
    }
    await hset(listId, 'todos', JSON.stringify(tasks))
    res.status(200).json({ task: tasks })
  } catch (err) {
    res.status(200).json({
      error: 'There was an error while connecting. Plese try again later.'
    })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { listId, taskId } = req.params
    if (!(await hexists(listId, 'todos'))) {
      return res
        .status(404)
        .json({ error: 'The list you are looking for doesnot exist.' })
    }
    let tasks = await hget(listId, 'todos')
    tasks = JSON.parse(tasks)
    const index = tasks.findIndex(task => task.taskId * 1 === taskId * 1)
    if (index === -1) {
      return res
        .status(404)
        .json({ error: 'The task you are looking for doesnot exist.' })
    }
    tasks.splice(index, 1)
    await hset(listId, 'todos', JSON.stringify(tasks))
    res.status(200).json({ deleted: true })
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while connecting. Please try again later'
    })
  }
}

const clearCompletedTasks = async (req, res) => {
  try {
    const { listId } = req.params
    const { tasks } = req.body
    if (!(await hexists(listId, 'todos'))) {
      return res
        .status(404)
        .json({ error: 'The list you are looking for doesnot exist.' })
    }
    await hset(listId, 'todos', JSON.stringify(tasks))
    res.status(200).json({ task: tasks })
  } catch (err) {
    res.status(200).json({
      error: 'There was an error while connecting. Plese try again later.'
    })
  }
}

module.exports = {
  getAllTasks,
  createNewTask,
  updateTask,
  deleteTask,
  clearCompletedTasks
}
