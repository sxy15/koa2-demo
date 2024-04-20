const seq = require('./seq')

require('./model/index')

// 测试连接
seq.authenticate().then(() => {
    console.log('ok')
})

// 执行同步 force: true 会先删除表然后新建表
seq.sync({ force: false }).then(() => {
    console.log('sync ok')
    process.exit()
})