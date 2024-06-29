require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
//const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


const token = process.env.DISCORD_BOT_TOKEN; 
const guildId = process.env.GUILD_ID;
const userId = process.env.USER_ID; 

let guild;
let member;
let nickname;

async function changeNickname() {
    try {
        console.log('Trying changing nickname');
        console.log(`${nickname} => ${++nickname}`);
        member.setNickname(`${nickname} days w/o sex`);
    } catch (error) {
        console.error('Error changing nickname:', error);
    }
}

cron.schedule('0 21 * * *', () => {
    changeNickname();
});

async function init(){
    guild = await client.guilds.fetch(guildId);
    member = await guild.members.fetch(userId);
    nickname = parseInt(member.nickname.slice(0, -13));
}

client.once('ready', () => {
    console.log('Bot started');
    init().then(()=>{changeNickname()}); 
});

client.login(token);