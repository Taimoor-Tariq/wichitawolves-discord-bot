exports.run = (client, message, args) => {
	let user = message.author
  
	if (message.channel.type != "text") {
		message.reply("This command cannot be used in DM.");
		return;
	}
  
	var wsChannels = [
		"649150418412371974",
		"649150421574877206"
	]; // ID of whitelisted channels.
  
	console.log(` \n> ${user.tag} typed the 'suggest' command.`);
	if (wsChannels.includes(message.channel.id)) {
  
		let suggestions = client.channels.get("649150418412371974");
	
		if (args[0]) {
			message.delete();
	
			let userSuggestion = args.join(" ");
	
			suggestions.send({embed: {
				color: 0xffc300,
				fields: [
					{
					name: `Suggestion:`,
					value: `ㅤ\n${userSuggestion}\nㅤ`
					}
				],
				footer: {
					icon_url: user.avatarURL,
					text: `Suggested by: ${user.tag}`
				}
			}}).then(async msg => {
				await msg.react("👍");
				await msg.react("👎");
			});
	
			if (message.channel.id != "649150418412371974") message.reply(`Your suggestion has been posted in ${suggestions.toString()}`);
	
			console.log(`    - ${user.tag} has provided a suggestion (${userSuggestion}).`);
		} else {
			console.log(`    - ${user.tag} did not provided a suggestion.`);
			message.reply("Please enter your suggestion after the command for example: `ㅤ>suggest ABC DEFㅤ` .");
		}
	
		console.log(`> End of command entered by ${user.tag}\n `);
	} else {
		let botCommands = client.channels.get("644639457538211841");
		// message.reply(`this command can only be typed in ${botCommands.toString()}`);
	}
};
  
exports.help = {
	name: "suggest"
};
  