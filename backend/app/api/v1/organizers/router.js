const express = require("express");
const router = express();
const { create, createCMSUser } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.post("/organizers", authenticateUser, authorizeRoles("owner"), create);
router.post(
  "/admins",
  authenticateUser,
  authorizeRoles("organizer"),
  createCMSUser,
);

module.exports = router;
