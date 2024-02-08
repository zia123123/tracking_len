const { driver, vehicle, user, track } = require("../models/index");
const { Op, json } = require("sequelize");
const apiResponse = require("../helpers/apiResponse");
require("dotenv").config();
module.exports = {
  async craete_tracking(req, res, next) {
    try {
      let { latitude, longitude, name_location, vehicleId } = req.body;
      let data = await track.create({
        latitude: latitude,
        longitude: longitude,
        name_location: name_location,
        vehicleId: vehicleId,
      });
      return apiResponse.successResponseNewdata(res, "SUCCESS CREATE", "Resource created", data);
    } catch (error) {
      return apiResponse.ErrorResponse(res, error.message);
    }
  },

  async get_tracking(req, res, next) {
    let { vehicleId, limit, page } = req.query;

    let query = {};
    if (vehicleId) {
      query = {
        vehicleId: vehicleId,
      };
    }
    if (limit == undefined) {
      limit = 10;
    }
    if (page == undefined) {
      page = 1;
    }
    try {
      let countData = await track.count({
        where: query,
      });
      let data = await track.findAll({
        where: query,
        limit: limit,
        offset: (page - 1) * limit,
        include: [
          {
            model: vehicle,
            as: "vehicle",
            attributes: ["id", "number_vehicle", "health_vehicle", "last_maintenance"],
          },
        ],
      });
      var totalData = parseInt(countData) / limit;
      var totalPage = Math.ceil(totalData);
      var returnData = {
        metadata: {
          page: page,
          count: data.length,
          totalPage: parseInt(totalPage),
          totalData: countData,
        },
        data: data,
      };
      return apiResponse.successResponseNewdata(res, "SUCCESS GET", "Resource created", returnData);
    } catch (error) {
      return apiResponse.ErrorResponse(res, error.message);
    }
  },
};
