module.exports = async (client, msgReaction, user) => {
	var rea = msgReaction.emoji.name;
	var member = msgReaction.message.guild.members.find(member => member.id === user.id);

	if (user.bot) return;

	// console.log(msgReaction.message.id)

	if (msgReaction.message.id == "649158504762048532") {  
		var cRole = rea.replace(/_/g, " ");
		member.addRole(member.guild.roles.find(role => role.name === cRole));
		console.log(`    - Gave ${member.user.tag} the ${cRole} role.`);
	}
	
	if (msgReaction.message.id == "649155799595352074") {
		if (rea == "WichitaWolves") {
			member.addRole(member.guild.roles.find(role => role.name === "Pack"));
		}
	}
};
