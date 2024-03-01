const { SlashCommandBuilder } = require('discord.js');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard'
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Get user\'s level'),
    async execute(interaction) {
        console.log(interaction.user.id);
        const userId = interaction.user.id;

        connection.query(
            `SELECT user_level FROM levels WHERE user_id = ${userId}`,
            (err, results) => {
                if (err) {
                    throw err;
                }
                if (results.length > 0) {
                    const userLevel = results[0].user_level;
                    interaction.reply(`Your current level is: **${userLevel}**`)
                    // Now you have the user's level in the userLevel variable.
                } else {
                    console.log('User not found in the levels table.');
                }
            }
        );
    },
};
