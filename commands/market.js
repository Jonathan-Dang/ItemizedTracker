import { SlashCommandBuilder } from 'discord.js';
import * as cheerio from 'cheerio';
import axios from 'axios';
import pretty from 'pretty';

export const data = new SlashCommandBuilder()
    .setName('market')
    .setDescription('Queries Wikipedia regarding the searched object.')
    .addStringOption(option => 
        option
            .setName('item')
            .setDescription('The Query Item.')
            .setRequired(true))
    .addStringOption( option => 
        option
            .setName('site')
            .setDescription('Website to look for the item.')
            .addChoices(
                { name: 'Amazon', value:'https://www.amazon.com/s?k='},
                { name: 'Nike', value: 'https://www.nike.com/w?q='}
            ));

export async function execute (interaction) {
    const item = interaction.options.getString('item');
    const site = interaction.options.getString('site');

    const response = await axios.get(
        site+item, 
        {headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        }}
    );

    const $ = cheerio.load(response.data);
    let output = '';
    if (site.includes('amazon')) {
        const itemAppearence = $('.a-size-medium.a-color-base.a-text-normal');
        const prices = $('.a-offscreen').text().split('$');
        let i = 1;
        itemAppearence.each(function (idx, el) {
            output += $(el).text() + ` | ${prices[i++]}\n\n`;
        });
    }

    interaction.reply(output.substring(0,1999).substring(0, output.lastIndexOf('\n')));
}
