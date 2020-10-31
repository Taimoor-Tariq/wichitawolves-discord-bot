const exec = require('child_process').exec;
const childPorcess = exec('java -jar ./Modules/JMusicBot-0.3.1.jar', function(err, stdout, stderr) {
    if (err) {
        console.log(err);
    }
    console.log("[WOLVES BOT]: STARTING ...");
    console.log(stdout);
})