const { vehicle, user, track } = require("../models/index");
const { Op, Sequelize } = require("sequelize");
const apiResponse = require("../helpers/apiResponse");
require("dotenv").config();
module.exports = {
  async craete_vehicle(req, res, next) {
    try {
      let { number_vehicle, health_vehicle, last_maintenance } = req.body;
      let data = await vehicle.create({
        number_vehicle: number_vehicle,
        health_vehicle: health_vehicle,
        last_maintenance: last_maintenance,
        userId: req.user.id,
      });
      return apiResponse.successResponseNewdata(res, "SUCCESS CREATE", "Resource created", data);
    } catch (error) {
      return apiResponse.ErrorResponse(res, error);
    }
  },

  async get_vehicle(req, res, next) {
    let { order_track_count } = req.query;
    if (order_track_count == undefined) {
      order_track_count = "DESC";
    }
    try {
      let data = await vehicle.findAll({
        include: [
          {
            model: user,
            as: "user",
            attributes: ["id", "username", "role"],
          },
        ],
        attributes: [
          "id",
          "number_vehicle",
          "health_vehicle",
          "last_maintenance",
          [Sequelize.literal("(SELECT COUNT(*) FROM tracks WHERE vehicle.id = tracks.vehicleId)"), "total_track_count"],
        ],
        order: [[Sequelize.literal("total_track_count"), order_track_count]],
      });
      return apiResponse.successResponseNewdata(res, "SUCCESS GET", "Resource created", data);
    } catch (error) {
      return apiResponse.ErrorResponse(res, error.message);
    }
  },

  async get_detail_vehicle(req, res, next) {
    try {
      let data = await vehicle.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: user,
            as: "user",
            attributes: ["id", "username", "role"],
          },
        ],
      });
      return apiResponse.successResponseNewdata(res, "SUCCESS GET", "Resource created", data);
    } catch (error) {
      return apiResponse.ErrorResponse(res, error);
    }
  },

  async update_vehicle(req, res, next) {
    try {
      let { number_vehicle, health_vehicle, last_maintenance } = req.body;
      let data = await vehicle.update(
        {
          number_vehicle: number_vehicle,
          health_vehicle: health_vehicle,
          last_maintenance: last_maintenance,
          userId: req.user.id,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return apiResponse.successResponseNewdata(res, "SUCCESS UPDATE", "Resource created", data);
    } catch (error) {
      return apiResponse.ErrorResponse(res, error);
    }
  },
  async delete_vehicle(req, res, next) {
    try {
      let { id } = req.body;
      let data = await vehicle.destroy({
        where: {
          id: id,
        },
      });
      return apiResponse.successResponseNewdata(res, "SUCCESS DELETE", "Resource created", data);
    } catch (error) {
      return apiResponse.ErrorResponse(res, error);
    }
  },
  async detail(req, res, next) {
    try {
      let { id } = req.body;
      let data = await vehicle.findOne({
        where: {
          id: req.params.id,
        },
      });
      return apiResponse.successResponseNewdata(res, "SUCCESS GET", "Resource created", data);
    } catch (error) {
      return apiResponse.ErrorResponse(res, error);
    }
  },
};
