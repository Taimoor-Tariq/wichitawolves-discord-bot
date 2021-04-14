module.exports = async (client, msgReaction, user) => {
	let rea = msgReaction.emoji.name,
		member = msgReaction.message.guild.members.cache.find(member => member.id === user.id);
  
	if (user.bot) return;
	
	if (msgReaction.message.id == "821193620244660285") {
		var cRole = rea.replace(/_/g, " ");
		member.roles.remove(member.guild.roles.cache.find(role => role.name === cRole));
		console.log(`    - Removed the ${cRole} role from ${member.user.tag}.`);
	}
  
	if (msgReaction.message.id == "649155799595352074") {
		if (rea == "WichitaWolves") {
			try {member.roles.remove(member.guild.roles.cache.find(role => role.name === "Pack"))}
			catch (err) {console.log(`    - User not in server.`)}
		}
	}
};