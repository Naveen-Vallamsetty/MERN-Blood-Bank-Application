const express = require("express");
const { testController } = require("../controllers/textController");

//router Object
const router = express.Router();

// routes
router.get("/", testController);

module.exports = router;
