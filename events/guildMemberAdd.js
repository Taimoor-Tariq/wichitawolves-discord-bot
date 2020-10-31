module.exports = (client, member) => {
	console.log(` \n> Start of MemberJoin event.`);
	// const guild = member.guild;
	// const timestampFromSnowflake = (id) => {
	// 	return (id / 4194304) + 1420070400000;
	// };

	// console.log(`g-${guild.id}`)

	// // https://discord.gg/3fDTmJ

	let userID = member.user;
	let userName = member.user.tag;
	let logChannel = member.guild.channels.get("618957285728714755");

	logChannel.send({embed: {
		color: 0x00cc66,
		description: `**[${userID.username}](https://discordapp.com/channels/617434888555200576/618957285728714755)** has joined the pack.`
	}});

	member.send({embed: {
		color: 0x00cc66,
		description: `
<:WichitaWolves:645375701507244043> **__Welcome to Wichita Wolves__**

Make sure to read [RULES](https://discordapp.com/channels/617434888555200576/649150426159251477) to view all channels.
	`
	}});

	console.log(`    - ${userName} has joined the server.`);

	console.log(` > End of MemberJoin event.\n `);
}