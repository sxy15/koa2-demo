const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

function genValidator(validator) {
    return async (ctx, next) => {
        const error = validator(ctx.request.body)

        if(error) {
            ctx.body =  new ErrorModel(jsonSchemaFileInfo)
            return
        }
        await next()
    }
}

module.exports = {
    genValidator
}