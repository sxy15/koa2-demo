const { Blog, User } = require('./model')

!(async function() {
    // 创建用户
    const zhangsan = await User.create({
        userName: 'zhangsan',
        password: '123',
        nickName: '张三'
    })
    const lisi = await User.create({
        userName: 'lisi',
        password: '123',
        nickName: '李四'
    })
    const wangwu = await User.create({
        userName: 'wangwu',
        password: '123',
        nickName: '王五'
    })

    // 创建博客
    const blog1 = await Blog.create({
        title: '标题1',
        content: '内容1',
        userId: zhangsan.dataValues.id
    })
    const blog2 = await Blog.create({
        title: '标题2',
        content: '内容2',
        userId: zhangsan.dataValues.id
    })
    const blog3 = await Blog.create({
        title: '标题3',
        content: '内容3',
        userId: lisi.dataValues.id
    })
    const blog4 = await Blog.create({
        title: '标题4',
        content: '内容4',
        userId: lisi.dataValues.id
    })
    const blog5 = await Blog.create({
        title: '标题5',
        content: '内容5',
        userId: wangwu.dataValues.id
    })
    const blog6 = await Blog.create({
        title: '标题6',
        content: '内容6',
        userId: wangwu.dataValues.id
    })
})()