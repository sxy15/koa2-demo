const { timeFormat } = require('../utils/dt')
const { REG_FOR_AT_WHO } = require('../conf/constants')

function _formatUserPicture(user) {
    if(user.picture === null) {
        user.picture = 'https://dwz.cn/rnTnftZs'
    }
    return user
}

function _formatUser(list) {
    if (list === null) {
        return list
    }

    if (list instanceof Array) {
        return list.map(_formatUserPicture)
    }

    return _formatUserPicture(list)
}

function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}


function _formatContent(obj) {
    obj.contentFormat = obj.content

    // 格式化 @
    // from '哈喽 @张三 - zhangsan 你好'
    // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
    obj.contentFormat = obj.contentFormat.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            return `<a href="/profile/${userName}">@${nickName}</a>`
        }
    )

    return obj
}

function _formatBlog(list) {
    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        // 数组
        return list.map(_formatDBTime).map(_formatContent)
    }
    // 对象
    let result = list
    result = _formatDBTime(result)
    result = _formatContent(result)
    return result
}

module.exports = {
    _formatUserPicture,
    _formatUser,
    _formatBlog
}