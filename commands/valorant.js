exports.run = (client, message, args) => {
    let user = message.author
    console.log(` \n> ${user.username} typed the 'valorant' command.`);

    message.delete();

    if (message.member.roles.find(r => r.name === "VALORANT")) {
        client.guilds.get("617434888555200576").members.get(user.id).addRole(client.guilds.get("617434888555200576").roles.find(role => role.name === "VALORANT"));
        console.log(`    - Gave ${user.username} the VALORANT role.`);
    }
    else {
        client.guilds.get("617434888555200576").members.get(user.id).removeRole(client.guilds.get("617434888555200576").roles.find(role => role.name === "VALORANT"));
        console.log(`    - Removed the VALORANT role from ${user.username}.`);
    }

    console.log(`> End of command entered by ${user.username}\n `);
};

exports.help = {
    name: 'valorant'
}