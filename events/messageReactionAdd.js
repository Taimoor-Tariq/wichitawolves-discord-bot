module.exports = async (client, msgReaction, user) => {
	let rea = msgReaction.emoji.name,
		member = msgReaction.message.guild.members.cache.find(member => member.id === user.id);

	if (user.bot) return;

	if (msgReaction.message.id == "821193620244660285") {  
		var cRole = rea.replace(/_/g, " ");
		member.roles.add(member.guild.roles.cache.find(role => role.name === cRole));
		console.log(`    - Gave ${member.user.tag} the ${cRole} role.`);
	}
	
	if (msgReaction.message.id == "649155799595352074") {
		if (rea == "WichitaWolves") {
			member.roles.add(member.guild.roles.cache.find(role => role.name === "Pack"));
		}
	}
};
