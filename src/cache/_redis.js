const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient({
    ...REDIS_CONF
})

redisClient.on('error', err => {
    console.error('redis error', err)
})

// set
// timeout 单位 s
function set(key, val, timeout = 60 * 60) {
    if(typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
    redisClient.expire(key, timeout)
}

// get

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if(err) {
                reject(err)
                return
            }
            if(val == null) {
                resolve(null)
                return
            }

            try {
                resolve(
                    JSON.parse(val)
                )
            } catch(ex) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}