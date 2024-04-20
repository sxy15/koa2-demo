const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')
const { PAGE_SIZE } = require('../conf/constants')

/**
 * 获取广场的微博列表
 * @param {number} pageIndex pageIndex
 */
async function getSquareBlogList(pageIndex = 0) {
    const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
    const blogList = result.blogList

    // 拼接返回数据
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: 5,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    getSquareBlogList
}