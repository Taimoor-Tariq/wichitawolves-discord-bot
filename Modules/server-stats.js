exports.run = (client) => {
	let guild = client.guilds.get("617434888555200576");

	let onlineDisp = guild.channels.get("647259410015715339");
	let adminDisp = guild.channels.get("661678974828675103");

	let alphaWolf = guild.roles.get("649147463126745088");
	let betaWolf = guild.roles.get("649147463227277323");
	let deltaWolf = guild.roles.get("649147464091435019");

	let meetingCat = guild.channels.get("649150414456881193");
	let meetingVC = guild.channels.get("649150437647319050");

	setInterval(() => {
		meetingCat.setName(`MEETING (CONNECTED: ${meetingVC.members.size} / ${guild.memberCount})`);
	}, 1000);

	setInterval(() => {
		onlineDisp.setName(`Wolves Online: ${guild.members.filter(member => member.presence.status !== "offline").size - (alphaWolf.members.size + betaWolf.members.size + deltaWolf.members.size)} / ${guild.memberCount - (alphaWolf.members.size + betaWolf.members.size + deltaWolf.members.size)}`);

		adminDisp.setName(`Admin Online: ${alphaWolf.members.filter(member => member.presence.status !== "offline").size + betaWolf.members.filter(member => member.presence.status !== "offline").size + deltaWolf.members.filter(member => member.presence.status !== "offline").size} / ${alphaWolf.members.size + betaWolf.members.size + deltaWolf.members.size}`);
	}, 300000);
};