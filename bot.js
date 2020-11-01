const active = true;

const Discord = require('discord.js');
const fs = require('fs');
require('dotenv-flow').config();

const client = new Discord.Client();

if (active) {
	console.log(` \nLoading Commands and events:\n `)
	client.commands = {};

	// Getting Events
	fs.readdir('./events/', async (err, files) => {
		if (err) return console.error;
		console.log('• Events:')
		files.forEach(file => {
			if (!file.endsWith('.js')) return;
			const evt = require(`./events/${file}`);
			let evtName = file.split('.')[0];
			console.log(` - Loaded → ${evtName}`);
			client.on(evtName, evt.bind(null, client))
		});
		console.log(' ')
	});

	// Getting Commands
	fs.readdir('./commands/', async (err, files) => {
		if (err) return console.error;
		console.log('• Commands:')
		files.forEach(file => {
			if (!file.endsWith('.js')) return;
			let props = require(`./commands/${file}`);
			let cmdName = file.split('.')[0];
			console.log(` - Loaded → ${cmdName}`);
			client.commands[cmdName] = props;
		});
		console.log(' ')
	});

	console.stdlog = console.log.bind(console);
	console.logs = [];
	console.log = function(){
		console.logs.push(Array.from(arguments));
		console.stdlog.apply(console, arguments);
	}

	client.on('raw', async event => {
		switch(event.t){
			case "MESSAGE_REACTION_REMOVE": {
				const { d: data } = event;
				const user = client.users.get(data.user_id);
				const channel = client.channels.get(data.channel_id) || await user.createDM();
				const message = await channel.fetchMessage(data.message_id);
				const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
				const reaction = message.reactions.get(emojiKey);
		
				client.emit('messageReactionRemove', reaction, user);
				break;
			}
		}
	});

	client.on('voiceStateUpdate', (oldMember, newMember) => {
		const vcModule = require('./Modules/voiceChannels.js');
		vcModule(client, oldMember, newMember);
	});

	client.login(process.env.TOKEN);
}
else console.log("BOT is not active\n");

