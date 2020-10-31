module.exports = async (client, msgReaction, user) => {
	var rea = msgReaction.emoji.name;
	var member = msgReaction.message.guild.members.find(member => member.id === user.id);
  
	if (user.bot) return;
	
	if (msgReaction.message.id == "649158504762048532") {
		var cRole = rea.replace(/_/g, " ");
		member.removeRole(member.guild.roles.find(role => role.name === cRole));
		if (console.logs[console.logs.length - 1][0] != `    - Removed the ${cRole} role from ${member.user.tag}.`) console.log(`    - Removed the ${cRole} role from ${member.user.tag}.`);
	}
  
	if (msgReaction.message.id == "649155799595352074") {
		if (rea == "WichitaWolves") {
			try {member.removeRole(member.guild.roles.find(role => role.name === "Pack"))}
			catch (err) {console.log(`    - User not in server.`)}
		}
	}
};