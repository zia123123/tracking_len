"use strict";
module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define(
    "track",
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
    },
    {
      tableName: "tracks",
    }
  );

  track.associate = function (models) {
    track.belongsTo(models.vehicle);
  };

  return track;
};
