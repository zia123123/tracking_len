const e = require("express");
const { user } = require("../models/index");
module.exports = {
  async policy_super_admin(req, res, next) {
    let role_user = await user.findByPk(req.user.id);
    if (role_user.role == "admin") {
      next();
    } else {
      res.status(403).json({ message: "you dont have access!" });
    }
  },
  async policy_user(req, res, next) {
    let role_user = await user.findByPk(req.user.id);
    if (role_user.role == "user") {
      next();
    } else {
      res.status(403).json({ message: "you dont have access!" });
    }
  },
};
