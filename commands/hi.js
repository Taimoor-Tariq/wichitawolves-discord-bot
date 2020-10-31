exports.run = (client, message, args) => {
    let userName = message.author.username
    let userID = message.author.id;
    console.log(` \n> ${userName} typed the 'hi' command.`);

    message.channel.send(`Hi <@${userID}>, hope you are having a good time.`)
    console.log(`    - I said hi to ${userName}.`);

    console.log(`> End of command entered by ${userName}\n `);
};

exports.help = {
    name: 'hi'
}