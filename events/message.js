const
    { BOT_PREFIX } = require('../config'),
    announceModule = require('../modules/announcements');

module.exports = async (client, message) => {
    if (message.author.bot) return;

    switch (message.channel.id) {
        case "649150418106056704":
            return message.delete();

        case "654103070745034752":
            return announceModule(client, message);

        case "649150418412371974":
            if (!message.content.startsWith(".suggest"))
            return setTimeout(function() {
                message.reply("use .suggest SUGGESTION to make a suggestion.")
                message.delete();
            }, 100);

    }
    
    if (message.content.indexOf(BOT_PREFIX) !== 0) return;

	let args = message.content
		.slice(BOT_PREFIX.length)
		.trim()
		.split(/ +/g);
    
    const
        command = args.shift().toLocaleLowerCase(),
        cmd = client.commands[command];

	if (!cmd) return;
    cmd.run(client, message, args);
};