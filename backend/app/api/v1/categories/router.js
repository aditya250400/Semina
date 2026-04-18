const express = require("express");
const router = express();
const { create, index, show } = require("./controller");

router.get("/categories", index);
router.get("/categories/:id", show);

router.post("/categories", create);

module.exports = router;
