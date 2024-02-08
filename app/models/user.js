"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
      },
    },
    {
      tableName: "users",
    }
  );

  user.associate = function (models) {};

  return user;
};
