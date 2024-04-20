const server = require('../server')

test('查询注册的用户名，应该存在', async () => {
  const res = await server
      .post('/api/user/isExist')
      .send({ userName: 'wxy' })
  expect(res.body.errno).toBe(0)
})