const seq = require('../seq')
const { STRING, TEXT, INTEGER } = require('../types')

// 创建 Blog 模型
const Blog = seq.define('blog', {
    content: {
        type: TEXT,
        allowNull: false,
        comment: '内容'
    },
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    image: {
        type: STRING,
        comment: '图片地址'
    }
})

module.exports = Blog