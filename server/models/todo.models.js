const redis = require('redis')
const REDIS_PORT = 6379
const client = redis.createClient(REDIS_PORT)
const { promisify } = require('util')
// console.log(promisify(client.get))

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

// const get = client.get
// const hmset = client.hmset
// const incr = client.incr
// const rpush = client.rpush
// const lrange = client.lrange
// const hgetall = client.hgetall
// const hdel = client.hdel
// const lrem = client.lrem
// const hset = client.hset
// const hexists = client.hexists
// const hget = client.hget

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
