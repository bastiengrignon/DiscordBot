const Discord = require('discord.js')
const auth = require('./auth.json')

const leavingMessage = (userId, channelName) => {
    return `<@${userId}> sort du channel ${channelName}`
}

const enteringMessage = (userId, channelName) => {
    return `<@${userId}> vient d'arriver sur  ${channelName}`
}

const client = new Discord.Client()
client.login(process.env.BOT_TOKEN).then()

client.on("ready", () => {
    console.log("Online")
    client.user.setPresence({
        game: {
            name: "Coding",
            type: "PLAYING"
        },
        status: "online"
    }).then()
})

client.on('voiceStateUpdate', (oldState, newState) => {
    const channel = client.channels.cache.filter((channel) => channel.id === "772433272449007626").first()

    if (oldState.channel === null && newState.channel !== null) {
        channel.send(enteringMessage(newState.member.user.id, newState.channel.name), {tts: true})
    }
    if (oldState.channel !== null && newState.channel === null) {
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
        }
    }
})