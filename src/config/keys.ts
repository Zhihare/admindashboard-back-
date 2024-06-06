export default () =>
({
    port: parseInt(process.env.PORT, 10) || 3000,
    mongoUri: process.env.MONGO_URL,
    mongoDbName: process.env.MONGO_DB_NAME,
    host: process.env.HOST || 'localhost',
    secretJwt: process.env.SECRET,
    expireJwt: process.env.EXPIREJWT,
    expireRefreshJwt: process.env.EXPIRE_JWT_REFRESH,
})