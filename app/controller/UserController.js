const { user, token_forgot_password } = require("../models/index");
const { Op, json } = require("sequelize");
const apiResponse = require("../helpers/apiResponse");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const authConfig = require("../../config/auth");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const {
  generateAccessToken,
  generateRefreshToken,
  calculateAccessTokenExpiry,
  calculateRefreshTokenExpiry,
} = require("../services/jwtService");
require("dotenv").config();
module.exports = {
  async login(req, res, next) {
    let { username, password } = req.body;
    try {
      let check_user = await user.findOne({
        where: {
          username: username,
        },
      });
      if (!check_user) {
        return apiResponse.notFoundResponseNew(res, "Not Found", "Resource not found", "14", "User not found");
      }
      let check_password = bcrypt.compareSync(password, check_user.password);
      if (!check_password) {
        return apiResponse.validationErrorWithData(
          res,
          "Bad Request",
          "Request is invalid, missing parameters?",
          "14",
          "Password not match"
        );
      }
      let accessToken = await generateAccessToken(check_user);
      let refreshToken = await generateRefreshToken(check_user);
      var data_expired = new Date();
      data_expired.setSeconds(data_expired.getSeconds() + authConfig.accessTokenExpiresIn);
      var data_expired_refresh = new Date();
      data_expired_refresh.setSeconds(data_expired_refresh.getSeconds() + authConfig.refreshTokenExpiresIn);
      let responseData = {
        errorCode: "00",
        errorMessage: "Success",
        data: {
          accessToken: accessToken,
          accessTokenExpiresAt: data_expired,
          accessTokenExpiresIn: authConfig.accessTokenExpiresIn,
          refreshToken: refreshToken,
          refreshTokenExpiresAt: data_expired_refresh,
          refreshTokenExpiresIn: authConfig.refreshTokenExpiresIn,
        },
      };
      return apiResponse.successResponseNewdata(res, "SUCCESS CREATE", "Resource created", responseData);
    } catch (error) {
      return apiResponse.ErrorResponse(res, error);
    }
  },

  async signupUser(req, res, next) {
    let { username, password } = req.body;
    try {
      let check_user = await user.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (check_user) {
        return apiResponse.alreadyExist(res, "Username already exist");
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
      }
      let encrypt_password = bcrypt.hashSync(password, Number.parseInt(authConfig.rounds));
      let result = await user
        .create({
          username: req.body.username,
          password: encrypt_password,
          role: "user",
        })
        .then(async (user) => {
          let accessToken = await generateAccessToken(user);
          let refreshToken = await generateRefreshToken(user);
          var data_expired = new Date();
          data_expired.setSeconds(data_expired.getSeconds() + authConfig.accessTokenExpiresIn);
          var data_expired_refresh = new Date();
          data_expired_refresh.setSeconds(data_expired_refresh.getSeconds() + authConfig.refreshTokenExpiresIn);
          let responseData = {
            errorCode: "00",
            errorMessage: "Success",
            data: {
              accessToken: accessToken,
              accessTokenExpiresAt: data_expired,
              accessTokenExpiresIn: authConfig.accessTokenExpiresIn,
              refreshToken: refreshToken,
              refreshTokenExpiresAt: data_expired_refresh,
              refreshTokenExpiresIn: authConfig.refreshTokenExpiresIn,
            },
          };
          return apiResponse.successResponseNewdata(res, "SUCCESS CREATE", "Resource created", responseData);
        })
        .catch(function (err) {
          return apiResponse.notFoundResponse(res, err);
        });
    } catch (error) {
      return apiResponse.notFoundResponse(res, error.message);
    }
  },
};
