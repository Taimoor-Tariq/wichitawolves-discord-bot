exports.run = (client, message, args) => {
	if (message.channel.type != "text") {
		message.reply("This command cannot be used in DM.");
		return;
	}

	let user = message.author;

	let wolfRole = message.guild.roles.get("649147472345694228");
	let giveUser = message.mentions.members.first();
	let giveRole = message.mentions.roles.first();
	let users = ["220161488516546561", "420782338000158721", "367070128598286337"];

	if (!users.includes(user.id)) {
		message.reply(` you cannot use this command.`);
	}
	else {
		if (!giveRole.name.startsWith("Overwatch")) {
			message.reply(` you can only give Overwatch Roles.`);
		}
		else {
			giveUser.addRole(giveRole);
			giveUser.addRole(wolfRole);
			message.channel.send(`**Done.**`);
		}
	}
	
	// console.log(giveRole.name);
};

exports.help = {
	name: "give"
};
