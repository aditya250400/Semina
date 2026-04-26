const express = require("express");
const router = express();
const { create, index, show, update, destroy } = require("./controller");
const {
  authenticateUser,
  //   authorizeRoles,
} = require("../../../middlewares/auth");

router.get("/categories", authenticateUser, index);

router.get("/categories/:id", authenticateUser, show);

router.put("/categories/:id", authenticateUser, update);

router.delete("/categories/:id", authenticateUser, destroy);

router.post("/categories", authenticateUser, create);

module.exports = router;
