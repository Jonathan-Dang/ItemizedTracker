import { SlashCommandBuilder, ChannelType } from 'discord.js';
import * as fs from 'fs';

export const data = new SlashCommandBuilder()
    .setName('channel')
    .setDescription('Sets the target channel for output.')
    .addChannelOption(option => option
        .setName('chan')
        .setDescription('text channel')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true));


export async function execute(interaction) {
    try {
        const channel = interaction.options.getChannel('chan').id;
        const rawDat = fs.readFileSync('./configs.json');
        // JData['targetChannel'] = channel;
        // fs.writeFileSync("../configs.json", JSON.stringify(JData));
        await interaction.reply(rawDat);
    } catch (error) {
        await interaction.reply(`ERROR: ${error}`);
    }
    
}