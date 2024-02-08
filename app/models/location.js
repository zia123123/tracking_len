"use strict";
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define(
    "location",
    {
      latitude: {
        type: DataTypes.STRING
      },
      longitude: {
        type: DataTypes.STRING
      },
      name_location: {
        type: DataTypes.STRING
      },
      name_province: {
        type: DataTypes.STRING
      },
    },
    {
      tableName: "locations",
    }
  );

  location.associate = function (models) {
  };

  return location;
};
