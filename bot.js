require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const token = process.env.DISCORD_BOT_TOKEN; 
const guildId = process.env.GUILD_ID;
const userId = process.env.USER_ID; 

async function changeNickname() {
    try {
        console.log('Nickname changed');
        const guild = await client.guilds.fetch(guildId);
        const member = await guild.members.fetch(userId);
        const nickname = member.nickname;
        if(nickname.match(/\d+\s+days\s+w\/o\s+sex/)){
            const newNickname = `${parseInt(nickname.slice(0, -13)) + 1} days w/o sex`;
            member.setNickname(newNickname);
        };
    } catch (error) {
        console.error('Error changing nickname:', error);
    }
}

cron.schedule('0 0 * * *', () => {
    changeNickname();
});

client.once('ready', () => {
    console.log('Bot started');
    changeNickname(); 
});

client.login(token);