const express = require("express");
const router = express();
const { create, createCMSUser } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.post("/organizers", authenticateUser, create);
router.post("/admins", authenticateUser, createCMSUser);

module.exports = router;
