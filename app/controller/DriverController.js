const { driver, vehicle, user } = require("../models/index");
const { Op, json } = require("sequelize");
const apiResponse = require("../helpers/apiResponse");
require("dotenv").config();
module.exports = {
  async craete_driver(req, res, next) {
    try {
      let { name, phone_number, address, vehicleId,driver_license,number_card } = req.body;
      let data = await driver.create({
        name: name,
        phone_number: phone_number,
        address: address,
        driver_license: driver_license,
        number_card: number_card,
        vehicleId: vehicleId,
        userId: req.user.id,
      });
      return apiResponse.successResponseNewdata(res, "SUCCESS CREATE", "Resource created", data);
    } catch (error) {
      console.log(error);
      return apiResponse.ErrorResponse(res, error.message);
    }
  },
  async get_driver(req, res, next) {
    try {
      let data = await driver.findAll({
        include: [
          {
            model: vehicle,
            as: "vehicle",
            attributes: ["id", "number_vehicle", "health_vehicle", "last_maintenance"],
          },
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
    async get_detail_driver(req, res, next) {
        try {
        let data = await driver.findOne({
            where: {
            id: req.params.id,
            },
            include: [
            {
                model: vehicle,
                as: "vehicle",
                attributes: ["id", "number_vehicle", "health_vehicle", "last_maintenance"],
            },
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
    async update_driver(req, res, next) {
        try {
        let { name, phone_number, address, vehicleId, driver_license, number_card } = req.body;
        let data = await driver.update(
            {
            name: name,
            phone_number: phone_number,
            address: address,
            driver_license: driver_license,
            number_card: number_card,
            vehicleId: vehicleId,
            userId: req.user.id,
            },
            {
            where: {
                id: req.params.id,
            },
        });
        return apiResponse.successResponseNewdata(res, "SUCCESS UPDATE", "Resource updated", data);
        } catch (error) {
        return apiResponse.ErrorResponse(res, error);
        }
    },
    async delete_driver(req, res, next) {
        try {
        let data = await driver.destroy({
            where: {
            id: req.params.id,
            },
        });
        return apiResponse.successResponseNewdata(res, "SUCCESS DELETE", "Resource deleted", data);
        } catch (error) {
        return apiResponse.ErrorResponse(res, error);
        }
    },
};
