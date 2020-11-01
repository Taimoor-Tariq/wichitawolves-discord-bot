const prefix = process.env.PREFIX;
const announceModule = require("../Modules/announcements.js");
const fs = require('fs');

var users = require('../users.json');

module.exports = async (client, message) => {
    if (message.author.id == "365975655608745985" && message.channel.id != "649720758691692565") {
		return message.delete();
	}

	if (message.author.bot) return;

	if (message.channel.id == "649150418106056704" && !message.content.startsWith(".valorant")) return message.delete();

	if (message.channel.id == "671083019855069191") {
		var args = message.content.split(" ");
		var cID = args[0];
		args.shift();
		var sen = args.join(" ");

		client.channels.get(cID).send(sen);
	}

	if (message.channel.id == "679212357238652938") {
		await message.react("654793522594971671");
		await message.react("654793522783846420");
	}

	if (!users[message.author.id]) {
		users[message.author.id] = {
			"msgN": 1,
			"name": "Not Set"
		}
	}
	else users[message.author.id]["msgN"]++;

	fs.writeFile("users.json", JSON.stringify(users, null, 4), (err) => {
		if (err) console.log(`    - Error`);
	});

	// console.log(users)

	if (message.channel.id=="649508164772954122") {
		client.channels.get("649508164772954122").fetchMessages({ limit: 6 }).then(messages => {
			var lastMessage, preMessage0, preMessage2, preMessage3;
			var msgN = 0;
			messages.forEach(m => {
				if (msgN == 1) lastMessage = m;
				if (msgN == 2) preMessage0 = m;
				if (msgN == 3) preMessage1 = m;
				if (msgN == 4) preMessage2 = m;
				if (msgN == 5) preMessage3 = m;
                msgN++;
            })

			let exceptRole = message.member.roles.find(r => r.name === "Counting Exception");

			if (
				preMessage0.author == message.author
			) {
				if(!exceptRole) {
					message.delete();
					message.reply("atleast 2 more people have to send a message after you for you to type again").then(msg => {setTimeout(() => {msg.delete()}, 3000)});
				}
			}
			else if (lastMessage.author == message.author) {
				if(!exceptRole) {
					message.delete();
				}
			}
			else if (parseInt(lastMessage.content)+1 != parseInt(message.content)) {
				message.delete();
			}
			// else if (parseInt(message.content) > 7500) {
			// 	message.delete();
			// 	message.reply("we have disabled counting to implement achievements!!! (<@220161488516546561> is counting how many messages are sent by each user.)").then(msg => {setTimeout(() => {msg.delete()}, 6000)});
			// }

			if ((parseInt(message.content))%500 == 0) message.pin().then(() => {
				client.channels.get("649508164772954122").fetchMessages({ limit: 1 }).then(messages => {
					messages.forEach(m => { m.delete() });
				});
			});
			
		});
	}

	if (message.channel.id=="654103070745034752") {
		announceModule(client, message);
	}

	if (message.channel.id == "649150418412371974" && (message.content.indexOf(prefix) !== 0 || !message.content.startsWith(".suggest"))) {
		setTimeout(function() {
			message.reply("use .suggest SUGGESTION to make a suggestion.")
			message.delete();
		}, 100);
		return;
	}

	if (message.content.indexOf(prefix) !== 0) return;

	args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const command = args.shift().toLocaleLowerCase();

	console.log(command)
	const cmd = client.commands[command];
	if (!cmd) return;

    cmd.run(client, message, args);
}