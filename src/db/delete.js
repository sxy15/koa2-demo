const {User, Blog } = require('./model')

!(async function() {
    const delBlogRes = await Blog.destroy({
        where: {
            id: 1
        }
    })
    console.log('delBlogRes', delBlogRes)

    const delUserRes = await User.destroy({
        where: {
            id: 1
        }
    })
    console.log('delUserRes', delUserRes)
})()