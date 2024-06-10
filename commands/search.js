import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('search')
    .setDescription('Queries Google regarding the searched object.')
    .addStringOption(option => 
        option
            .setName('Query')
            .setDescription('The Query Item.')
            .setRequired(true));

export async function execute(interaction) {
    let output = '';
    


    await interaction.reply(output);
}
