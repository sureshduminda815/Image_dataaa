module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("product", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        image: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

    
    })

    return Product

}