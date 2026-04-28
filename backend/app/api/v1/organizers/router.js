const express = require("express");
const router = express();
const { create, createCMSUser, getCMSUsers } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

// owner role

router.post("/organizers", authenticateUser, authorizeRoles("owner"), create);

router.get("/users", authenticateUser, authorizeRoles("owner"), getCMSUsers);

// organizer role
router.post(
  "/admins",
  authenticateUser,
  authorizeRoles("organizer"),
  createCMSUser,
);
module.exports = router;
