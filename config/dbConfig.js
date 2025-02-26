module.exports = {
    HOST: 'sql.freedb.tech',
    USER: 'freedb_ImageInfo-user',
    PASSWORD: 'GSP4enEUPE!jTm#',
    DB: 'freedb_imageInfo',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}