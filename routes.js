const express = require("express");
const router = express.Router();

router.get("/", function(request, response) {
	response.send("BOT ACTIVE");
});

module.exports = router;
