"use strict";
module.exports = (sequelize, DataTypes) => {
  const driver = sequelize.define(
    "driver",
    {
      name: {
        type: DataTypes.STRING
      },
      phone_number: {
        type: DataTypes.STRING
      },
      driver_license: {
        type: DataTypes.STRING
      },
      number_card: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
    },
    {
      tableName: "drivers",
    }
  );

  driver.associate = function (models) {
    driver.belongsTo(models.user);
    driver.belongsTo(models.vehicle);
  };

  return driver;
};
