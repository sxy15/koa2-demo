module.exports = {
    isDev: process.env.NODE_ENV === 'dev',
    isProd: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    notDev: process.env.NODE_ENV !== 'dev',
    notProd: process.env.NODE_ENV !== 'production',
    notTest: process.env.NODE_ENV !== 'test'
}