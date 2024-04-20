const { getUserInfo, createUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, loginFailInfo } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

async function isExist(userName) {
    const user = await getUserInfo(userName)

    if (user) {
        return new SuccessModel(user)
    }

    return new ErrorModel(registerUserNameNotExistInfo)
}

async function register({userName, password, gender, nickName}) {
    const userInfo = await getUserInfo(userName)

    if (userInfo) {
        return new ErrorModel(registerUserNameNotExistInfo)
    }

    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender,
            nickName
        })
        return new SuccessModel()
    } catch (ex) {
        return new ErrorModel(registerFailInfo)
    }
}

async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password))

    if (!userInfo) {
        return new ErrorModel(loginFailInfo)
    }

    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }

    return new SuccessModel()
}

async function changeInfo(ctx, {nickName, city, picture}) {
    const { userName } = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }

    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture
        },
        { userName }
    )
    if (result) {
        // 执行成功
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        // 返回
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changeInfoFailInfo)
}

async function changePassword(userName, password, newPassword) {
    const result = await updateUser(
        { newPassword: doCrypto(newPassword) },
        { userName, password: doCrypto(password) }
    )
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changePasswordFailInfo)

}

async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login,
    changeInfo,
    changePassword,
    logout
}