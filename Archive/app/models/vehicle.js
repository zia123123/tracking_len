"use strict";
module.exports = (sequelize, DataTypes) => {
  const vehicle = sequelize.define(
    "vehicle",
    {
      number_vehicle: {
        type: DataTypes.STRING
      },
      health_vehicle: {
        type: DataTypes.INTEGER
      },
      last_maintenance: {
        type: DataTypes.DATE
      },
    },
    {
      tableName: "vehicles",
    }
  );

  vehicle.associate = function (models) {
    vehicle.belongsTo(models.user);
    vehicle.hasOne(models.driver);
    vehicle.hasMany(models.track);
  };

  return vehicle;
};
