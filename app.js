const express = require("express");
const app = express();

require("./bot");
require("./Modules/music");

app.use(require('./routes'));
app.use(express.static("public"));

app.listen(3001, () => {
	console.log(`Your app is listening on port 3001`);
});