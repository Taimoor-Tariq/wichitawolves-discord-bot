module.exports = (client, oldMember, newMember) => {
	let oldInfo = {
		"vID": oldMember.voiceChannelID,
		"serverMuted": oldMember.serverMute,
		"selfMute": oldMember.selfMute,
	}

	let newInfo = {
		"vID": newMember.voiceChannelID,
		"serverMuted": newMember.serverMute,
		"selfMute": newMember.selfMute,
	}
}