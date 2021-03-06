const redis = require('redis')
const REDIS_PORT = 6379
const client = redis.createClient(REDIS_PORT)
const { promisify } = require('util')

client.on('error', err => {
  console.log(err)
})

client.on('connect', () => {
  console.log('CONNECTED')
})

const get = promisify(client.get).bind(client)
const hmset = promisify(client.hmset).bind(client)
const incr = promisify(client.incr).bind(client)
const rpush = promisify(client.rpush).bind(client)
const lrange = promisify(client.lrange).bind(client)
const hgetall = promisify(client.hgetall).bind(client)
const hdel = promisify(client.hdel).bind(client)
const lrem = promisify(client.lrem).bind(client)
const hset = promisify(client.hset).bind(client)
const hexists = promisify(client.hexists).bind(client)
const hget = promisify(client.hget).bind(client)

module.exports = {
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
}
