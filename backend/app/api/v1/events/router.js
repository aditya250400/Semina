const express = require("express");
const router = express();
const { create, index, show, update, destroy } = require("./controller");

router.get("/events", index);

router.get("/events/:id", show);

router.put("/events/:id", update);

router.delete("/events/:id", destroy);

router.post("/events", create);

module.exports = router;
