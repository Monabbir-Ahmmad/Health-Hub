const express = require("express");
const generalControllers = require("../controllers/general-controllers");

const router = express.Router();

router.get("/drugs", generalControllers.getDrug);

router.get("/user/:id", generalControllers.getUser);

module.exports = router;
