const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建 User 模型，数据表的名字是 users
// user -> users
const User = seq.define('user', {
    // id 会自动创建，并设为主键、自增
    userName: {
        type: Sequelize.STRING, // varchar(255)
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nickName: {
        type: Sequelize.STRING,
        comment: '昵称'
    }
})

const Blog = seq.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

// 外键关联
Blog.belongsTo(User, {
    foreignKey: 'userId'
})
User.hasMany(Blog, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog
}