const express = require("express");
const app = express();

require("./bot");
require("./Modules/music");

app.use(require('./routes'));
app.use(express.static("public"));

const listener = app.listen(process.env.PORT, () => {
	console.log("Your app is listening on port " + listener.address().port);
});