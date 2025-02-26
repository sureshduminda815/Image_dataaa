module.exports = (sequelize, DataTypes) => {
    const Vacancy = sequelize.define("Vacancy", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Vacancy;
  };