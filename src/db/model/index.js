const User = require('./user')
const Blog = require('./blog')
const UserRelation = require('./UserRelation')
const AtRelation = require('./AtRelation')

// 创建外键关联
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
    foreignKey: 'userId',
    targetKey: 'followerId'
})


Blog.hasMany(AtRelation, {
    foreignKey: 'blogId'
})

module.exports = {
    User,
    Blog,
    UserRelation,
    AtRelation
}