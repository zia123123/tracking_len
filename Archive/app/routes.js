const express = require("express");
const router = express.Router();
const passport = require("passport");
const token_policy = require("./middlewares/token_user");

const {
    policy_super_admin,
    policy_user,
  } = require("./policy/AuditPolicy");

const UserController = require("./controller/UserController");
const VehicleController = require("./controller/VehicleController");
const DriverController = require("./controller/DriverController");
const Tracking = require("./controller/TrackingController");

// module user
router.post("/api/v1/login", UserController.login);
router.post("/api/v1/register", UserController.signupUser);


// module vehicle
router.post("/api/v1/vehicle", token_policy, policy_user, VehicleController.craete_vehicle);
router.get("/api/v1/vehicle", token_policy, policy_user,  VehicleController.get_vehicle);
router.get("/api/v1/vehicle/:id", token_policy, policy_user,  VehicleController.get_detail_vehicle);
router.put("/api/v1/vehicle/:id", token_policy, policy_user,  VehicleController.update_vehicle);
router.delete("/api/v1/vehicle/:id", token_policy, policy_user,  VehicleController.delete_vehicle);


// module driver
router.post("/api/v1/driver", token_policy, policy_user,  DriverController.craete_driver);
router.get("/api/v1/driver", token_policy, policy_user,  DriverController.get_driver);
router.get("/api/v1/driver/:id", token_policy, policy_user,  DriverController.get_detail_driver);
router.put("/api/v1/driver/:id", token_policy, policy_user,  DriverController.update_driver);
router.delete("/api/v1/driver/:id", token_policy, policy_user,  DriverController.delete_driver);


// module tracking

router.post("/api/v1/tracking", Tracking.craete_tracking);
router.get("/api/v1/tracking/vehicle", Tracking.get_tracking);


module.exports = router;
