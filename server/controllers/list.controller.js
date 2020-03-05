const {
  get,
  hmset,
  incr,
  rpush,
  lrange,
  hdel,
  lrem,
  hset,
  hexists,
  hget
} = require('../models/todo.models')

const getLists = async (req, res) => {
  try {
    const listIds = await lrange('listIds', 0, -1)
    if (!listIds.length) {
      return res.status(200).send({ listCount: 0, lists: [] })
    }
    const allLists = []
    for (const listId of listIds) {
      const list = await hget(listId, 'listName')
      allLists.push({ listId, listName: list, inputToggle: true })
    }
    res.status(200).send({ lists: allLists })
  } catch (err) {
    res
      .status(500)
      .send({ error: 'There was an error. Please try again later' })
  }
}

const searchLists = async (req, res) => {
  try {
    const { listIds } = req.body
    // const listIds = await lrange('listIds', 0, -1)
    if (!listIds.length) {
      return res.status(200).send({ listCount: 0, lists: [] })
    }
    const allLists = []
    for (const listId of listIds) {
      const list = await hget(listId, 'listName')
      allLists.push({ listId, listName: list, inputToggle: true })
    }
    res.status(200).send({ lists: allLists })
  } catch (err) {
    res
      .status(500)
      .send({ error: 'There was an error. Please try again later' })
  }
}

const createList = async (req, res) => {
  const { listName } = req.body
  try {
    const listId = await get('listIdCounter')
    await hmset(listId, 'listName', listName, 'todos', '[]')
    await rpush('listIds', listId)
    await incr('listIdCounter')
    res.status(200).send({ listId, listName })
  } catch (err) {
    res.status(500).send({
      error: 'There is an error. Please try again later'
    })
  }
}

const updateList = async (req, res) => {
  try {
    const { listId } = req.params
    const { listName } = req.body
    let list = await hexists(listId, 'listName')
    if (!list) {
      return res
        .status(404)
        .send({ error: 'The list you are looking for does not exist' })
    }
    list = await hset(listId, 'listName', listName)
    res.status(200).send({ listId, listName })
  } catch (err) {
    res.status(500).send({
      error: 'There was an error. Please try again later'
    })
  }
}

const deleteList = async (req, res) => {
  try {
    const { listId } = req.params
    let delList = await lrem('listIds', 0, listId)
    if (!delList) {
      return res.status(404).send({ error: 'The list doesnot exist' })
    }
    delList = await hdel(listId, 'name')
    delList = await hdel(listId, 'todos')
    res.status(200).send({ deleted: true })
  } catch (err) {
    res.status(500).send({
      error: 'There was an error while connecting. Please try again later'
    })
  }
}

module.exports = { searchLists, createList, getLists, deleteList, updateList }
