const axios = require("axios");
const tmi = require('tmi.js');
const fs = require('fs');
const chatHandler = require('./chat_handler');
let commandsData = fs.readFileSync('commandes.json');
let commands = JSON.parse(commandsData).commands;
const env = require('dotenv');
env.config();

console.log("Il y a : " + commands.length + " commande disponible !")

let countDeath = 0;
let lastRip =0;

const client = new tmi.Client({
    options: {debug: true},
    identity: {
        username: 'meuuuhbot',
        password: process.env.IRC
    },
    channels: ['samouraijoke']
});

client.connect();


client.on('message', (channel, user, message, self) => {
    // Ignore echoed messages.
    if (self) return;

    // // CHECK FOR CAPSLOCK
    if (chatHandler.checkUppercase(message) === true) {
        client.say(channel, ` @${user.username} ARRÊTE DE CRIER ! meumeu3KNIFE` );
        return;
    }

    // // RETURN RESULT OF CMDS TYPE IN CHAT
    commands.forEach(c => {
        if (message.toLowerCase() === c.command) {
            if(c.text.includes('$pseudo')) {
                client.say(channel, chatHandler.formatPseudo(c.text, user))
            } else  {
                client.say(channel, c.text)
            }
        }
    })

    // DEATH COUNTER
    if(message == "rip" && (user.mod || user['user-type'] === 'mod') && Date.now() - lastRip > 20000) {
        //let countDeath = parseInt(localStorage.getItem('numDeath'));
        lastRip = Date.now();
        countDeath+=1;
        client.say(channel, "Nombre de morts: " +countDeath)
    }

    // DEATH COUNTER RESET
    if(message == "reset" && (user.mod || user['user-type'] === 'mod') && Date.now() - lastRip > 10000) {
        //let countDeath = parseInt(localStorage.getItem('numDeath'));
        countDeath=0;
        client.say(channel, "Nombre de morts remis à 0");
    }

    //CMD MORT POUR TOUS
    if(message.toLowerCase() === '!mort') {
        if(countDeath == 0) {
            client.say(channel, "Meumeu n'est toujours pas morte, allelujah meumeu3SWAG meumeu3Incroyable");
        } else if (countDeath >= 15 ) {
            client.say(channel, "Meumeu est morte " +countDeath+ " fois... Alors Meumeu, on ne sait pas jouer ? meumeu3TWAIRK meumeu3TWAIRK");
        } else {
            client.say(channel, "Meumeu est morte " +countDeath+ " fois... meumeu3RIP meumeu3CRY");
        }
    }
});


// const results =  () => axios.get(`https://api.twitch.tv/helix/chat/emotes?broadcaster_id=${process.env.CHANNEL_ID}`, { headers: {"Authorization" : `Bearer ${process.env.BEARER}`, 'Client-Id': `${process.env.CLIENT_ID}` } })
//    .then((response) => {
//        return response.data;
//    });
