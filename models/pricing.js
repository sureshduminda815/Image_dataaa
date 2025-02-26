module.exports = (sequelize, DataTypes) => {
  const pricing = sequelize.define('pricing', {
      title: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      price: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      features: {
          type: DataTypes.TEXT,
          allowNull: false,
      },
  }, {
      timestamps: true, // This will automatically add createdAt and updatedAt fields
  });

  return pricing;
};
