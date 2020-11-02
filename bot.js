const Discord = require('discord.js')
const auth = require('./auth.json')
let channelId = "772433272449007626"
let activateEnterMessage = true
let activateLeavingMessage = false

const leavingMessage = (userId, channelName) => {
    return `<@${userId}> sort du channel ${channelName}`
}

const enteringMessage = (userId, channelName) => {
    return `<@${userId}> vient d'arriver`
}

const client = new Discord.Client()
client.login(process.env.BOT_TOKEN).then()

client.on("ready", () => {
    console.log("Online")
    client.user.setPresence({
        game: {
            name: "Recording you",
            type: "PLAYING"
        },
        status: "online"
    }).then()
})

client.on('voiceStateUpdate', (oldState, newState) => {
    const channel = client.channels.cache.filter((channel) => channel.id === channelId.toString()).first()

    if (oldState.channel === null && newState.channel !== null) {
        // User enter a channel
        if (activateEnterMessage)
            channel.send(enteringMessage(newState.member.user.id, newState.channel.name), {tts: true})
    }
    if (oldState.channel !== null && newState.channel === null) {
        // User leave a channel
        if (activateLeavingMessage)
            channel.send(leavingMessage(oldState.member.user.id, oldState.channel.name), {tts: true})
    }
})

client.on('message', (message) => {
    if (message.content.substring(0, 1) === '!') {
        let args = message.content.substring(1).split(' ')
        switch(args[0]) {
            // !ping
            case 'ping':
                const ping = Date.now() - message.createdTimestamp + "ms";
                message.reply(`🏓Pong: ${ping}. \nAPI Latency is ${Math.round(client.ws.ping)}ms`).then()
                break
            case 'setChannel':
                channelId = args[1]
                message.reply(`Channel text updated ${message.channel}`).then()
                break
            case 'leavingMessage':
                if (args[1] === "true") {
                    activateLeavingMessage = true;
                    message.reply(`Leaving message activated`).then()
                } else if (args[1] === "false") {
                    activateLeavingMessage = false;
                    message.reply(`Leaving message deactivated`).then()
                } else {
                    message.reply(`Wrong argument`).then()
                }
                break
            case 'enteringMessage':
                if (args[1] === "true") {
                    activateEnterMessage = true;
                    message.reply(`Entering message activated`).then()
                } else if (args[1] === "false") {
                    activateEnterMessage = false;
                    message.reply(`Entering message deactivated`).then()
                } else {
                    message.reply(`Wrong argument`).then()
                }
                break
        }
    }
})