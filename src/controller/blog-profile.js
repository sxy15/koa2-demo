const { SuccessModel } = require('../model/ResModel')
const { getBlogListByUser } = require('../services/blog')

async function getProfileBlogList(userName, pageIndex = 0) {
    const result = await getBlogListByUser({
        userName,
        pageSize: 5,
        pageIndex
    })

    const blogList = result.blogList

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: 5,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    getProfileBlogList
}