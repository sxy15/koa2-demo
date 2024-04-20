const { Blog, User, UserRelation} = require('../db/model/index')
const { _formatUser, _formatBlog } = require('./format')

async function createBlog({userId, content, image}) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

async function getBlogListByUser({userName, pageIndex = 0, pageSize = 10}) {
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    })
    
    let blogList = result.rows.map(row => row.dataValues)
    blogList = _formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = _formatUser(user)
        return blogItem
    })
    console.log('blogList:', blogList)
    return {
        count: result.count,
        blogList
    }
}

async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageSize * pageIndex, // 跳过多少条
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            },
            {
                model: UserRelation,
                attributes: ['userId', 'followerId'],
                where: { userId }
            }
        ]
    })

    // 格式化数据
    let blogList = result.rows.map(row => row.dataValues)
    blogList = _formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = _formatUser(blogItem.user.dataValues)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser,
    getFollowersBlogList
}

