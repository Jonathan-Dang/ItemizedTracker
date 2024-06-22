import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {  Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

config();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] })
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = await import(`./commands/${file}`);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const event of eventsFiles){
	const eventObj = await import(`./events/${event}`);
	if (eventObj.once) {
		client.once(eventObj.name, (...args) => eventObj.execute(...args));
	} else {
		client.on(eventObj.name, (...args) => eventObj.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(process.env.BOT_SECRET);

