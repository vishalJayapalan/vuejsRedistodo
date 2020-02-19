const {
  get,
  hmset,
  incr,
  rpush,
  lrange,
  hgetall,
  hdel,
  lrem,
  hset,
  hexists,
  hget
} = require('../models/todo.models')

const createList = async (req, res) => {
  const { listName } = req.body
  try {
    const listId = await get('listIdCounter')
    await hmset(listId, 'name', listName, 'todos', '[]')
    await rpush('listIds', listId)
    await incr('listIdCounter')
    res.status(200).send({ listId: listId, name: listName })
  } catch (err) {
    res.status(500).send({
      error: 'There is an error. Please try again later'
    })
  }
}

const getLists = async (req, res) => {
  try {
    const listIds = await lrange('listIds', 0, -1)
    if (!listIds.length) {
      return res.status(200).send({ listCount: 0, lists: [] })
    }
    const allLists = []
    for (const listId of listIds) {
      const list = await hget(listId, 'name')
      allLists.push({ listId: listId, name: list })
    }
    res.status(200).send({ listCount: listIds.length, lists: allLists })
  } catch (err) {
    res
      .status(500)
      .send({ error: 'There was an error. Please try again later' })
  }
}

const updateList = async (req, res) => {
  try {
    const { listId } = req.params
    const { name } = req.body
    let list = await hexists(listId, 'name')
    if (!list) {
      return res
        .status(404)
        .send({ error: 'The list you are looking for does not exist' })
    }
    list = await hset(listId, 'name', name)
    res.status(200).send({ listId: listId, name: name })
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

module.exports = { createList, getLists, deleteList, updateList }
