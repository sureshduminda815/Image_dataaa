const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.pics = require('./imageModel.js')(sequelize, Sequelize);
db.products = require('./productModel.js')(sequelize, DataTypes)

db.Admin = require('./Admin.js')(sequelize, DataTypes)
db.Message = require('./message.js')(sequelize, DataTypes)
db.pricings = require('./pricing.js')(sequelize, DataTypes)
db.vacancies = require('./vacancy.model.js')(sequelize, DataTypes)
db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})



// 1 to Many Relation








module.exports = db
