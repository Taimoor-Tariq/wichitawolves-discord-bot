var cIDs = [];

module.exports = (client, message) => {
	client.guilds.cache.get("617434888555200576").channels.cache.forEach(c => {
		if (c.name == "announcements") cIDs.push(c.id);
	});

	let ms = message.content,
		mImages = [],
		sections = ms.split("|");

	if (sections.length < 3) return message.reply("Format ```[PING ROLE] |\n[TITLE] |\n[ANNOUNCEMENT]```");

	let men = sections[0].trim();
	sections.shift();

	ms = `­\n<:WichitaWolves:797586550421848095> __**${sections[0].trim()}**__\n`;
	sections.shift();

	sections.forEach(e => {
		var x = e.split("\n");
		x.forEach(t => {
			if (t != "") ms += `\n> ${t.trim()}`
		});
		ms += "\n";
	});

	ms += `­`;

	message.attachments.forEach(a => {
		mImages.push(a.url);
	});

	message.channel.send("```start of announcement```" + ms + "```end of announcement```", {files: mImages})
	message.channel.send(`­`).then(async msg2 => {
		message.channel.send(`­\n> 1️⃣ - will post the announcement in <#618571716070998047>.
		> 🇦 - will post the announcement in **roster channels**.
		> ⏹️ - will cancel this announcement.\n­`).then(async msg => {
			await msg.react("1️⃣");
			await msg.react("🇦");
			await msg.react("⏹️");

			let wsUsers = {
				ids: [
					"220161488516546561", // Taimoor
					"238037018431455233", // Dylan
					"261490835646840833", // Sparks
				],
				raw: []
			}

			for (var u in wsUsers.ids) wsUsers.raw.push(`<@${wsUsers.ids[u]}>`);

			const filter = (reaction, user) => ["1️⃣", "🇦", "⏹️"].includes(reaction.emoji.name) && user.id != "546324875271208970" && wsUsers.ids.includes(user.id);

			await msg.awaitReactions(filter, { max: 1 })
				.then(collected => {
					const reaction = collected.first();

					var approvedBy = "";
					reaction.users.forEach(u => {
						if (wsUsers.raw.includes(`${u}`)) return approvedBy = `${u}`;
					})

					switch (reaction.emoji.name) {
						case "1️⃣":
							message.channel.send(`­\n> Announcement approved by ${approvedBy}.\n­`);
							client.channels.get("618571716070998047").send(men);
							client.channels.get("618571716070998047").send(ms, {files: mImages});
							msg.delete();
							msg2.delete();
							break;

						case "🇦":
							message.channel.send(`­\n> Announcement made in **${cIDs.length} channels** was approved by ${approvedBy}.\n­`);
							for (var i in cIDs) {
								client.channels.get(cIDs[i]).send(men);
								client.channels.get(cIDs[i]).send(ms, {files: mImages});
							}
							msg.delete();
							msg2.delete();
							break;

						case "⏹️":
							message.channel.send(`­\n> Announcement Canceled by ${approvedBy}.\n­`);
							msg.delete();
							break;

						default:
							break;
					}
				})
				.catch(collected => {
					msg.delete();
					msg2.delete();
				});
		});
	});
	return;
}