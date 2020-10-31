var cIDs = [];
let excludeCats = [
	"669745551025111053",
	"649150413680934922",
	"649150415937732608",
	"661677749898838018",
	"649150414456881193",
	"649150414255816727",
	"649150415463776258",
	"649368204837257216",
	"651283179230986250",
	"649721484624789545"
];

module.exports = (client, message) => {
	client.guilds.get("617434888555200576").channels.forEach(c => {
		if(c.name == "announcements" && !excludeCats.includes(c.parentID)) cIDs.push(c.id);
	});

	var ms = message.content;
	var mImages = [];
	var sections = ms.split("|");
	if (sections.length < 3) return message.reply("Format ```[PING ROLE] |\n[TITLE] |\n[ANNOUNCEMENT]```");

	var men = sections[0].trim();
	sections.shift();

	ms = `­\n<:WichitaWolves:645375701507244043> __**${sections[0].trim()}**__\n`;
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

			const filter = (reaction, user) => ["1️⃣", "🇦", "⏹️"].includes(reaction.emoji.name) && user.id != "546324875271208970" && ["220161488516546561", "238037018431455233", "261490835646840833"].includes(user.id);

			await msg.awaitReactions(filter, { max: 1 })
				.then(collected => {
					const reaction = collected.first();

					var approvedBy = "";
					reaction.users.forEach(u => {
						if ([`<@220161488516546561>`, `<@238037018431455233>`,`<@261490835646840833>`].includes(`${u}`)) return approvedBy = `${u}`;
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
					// message.channel.send(`­\n> <@220161488516546561> FIX ME.\n­`)
					msg.delete();
					msg2.delete();
					// console.log(collected);
				});
		});
	});
	return;
}