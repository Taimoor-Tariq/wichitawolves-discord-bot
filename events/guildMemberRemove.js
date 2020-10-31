module.exports = (client, member) => {
	console.log(` \n> Start of MemberLeave event.`);


	let userID = member.user;
	let userName = member.user.tag;
	let logChannel = member.guild.channels.get("618957285728714755");

	logChannel.send({embed: {
		color: 0xcc0000,
		description: `**[${userID.username}](https://discordapp.com/channels/617434888555200576/618957285728714755)** has left the pack.`
	}});

	console.log(`    - ${userName} has joined the server.`);

	console.log(` > End of MemberLeave event.\n `);
}