const Discord = require('discord.js')
const auth = require('./auth.json')

const leavingMessage = (userId, channelName) => {
    return `Dites au revoir à <@${userId}> il vient de quitter le channel ${channelName}`
}

const enteringMessage = (userId, channelName) => {
    return `Dites bonjour à <@${userId}> il vient d'arriver dans le channel ${channelName}`
}

const client = new Discord.Client()
client.login(auth.token).then()

client.on("ready", () => {
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
        channel.send(enteringMessage(newState.member.user.id, newState.channel.name))
    }
    if (oldState.channel !== null && newState.channel === null) {
        channel.send(leavingMessage(oldState.member.user.id, oldState.channel.name))
    }
})

client.on('message', (message) => {
    if (message.content.substring(0, 1) === '!') {
        let args = message.content.substring(1).split(' ')
        switch(args[0]) {
            // !ping
            case 'ping':
                message.reply('Why are you doing this!').then()
                break
        }
    }
})