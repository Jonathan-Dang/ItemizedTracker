import { SlashCommandBuilder } from 'discord.js';
import * as cheerio from 'cheerio';
import axios from 'axios';
import pretty from 'pretty';


const response = await axios.get(
    'https://en.wikipedia.org/wiki/', 
    {headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    }}
);

export const data = new SlashCommandBuilder()
    .setName('search')
    .setDescription('Queries Wikipedia regarding the searched object.')
    .addStringOption(option => 
        option
            .setName('item')
            .setDescription('The Query Item.')
            .setRequired(true));

export async function execute(interaction) {
    let query = interaction.options.getString('item');
    query = query.replace(' ', '_');
    const response = await axios.get(
        `https://en.wikipedia.org/wiki/${query}`, 
        {headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        }}
    );
    const $ = cheerio.load(response.data);
    $('#mw-content-text');//.remove('style, div, script');
    const Filtered = pretty($('#mw-content-text p, #mw-content-text h1, #mw-content-text h2, #mw-content-text h3, #mw-content-text ul').text());
    let output;
    if (Filtered.length > 2000)
        output = Filtered.substring(0,1900);
    else
        output = Filtered;
    await interaction.reply(output.substring(0,output.lastIndexOf('.') == -1 ? output.lastIndexOf('\n') : output.lastIndexOf('.')));
}//Add next to forward Buffer [0->1999] then [2000->3999]
