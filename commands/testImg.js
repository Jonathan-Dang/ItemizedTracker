import { SlashCommandBuilder, Attachment, AttachmentBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('testimg')
    .setDescription('Sends a test image.');


export async function execute(interaction) {
    await interaction.reply({files: [{attachment: "./636e0a6ac3c481f273141736_icon_clyde_black_RGB.png"}]});
}