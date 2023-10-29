const { Events } = require('discord.js');
const mysql = require('mysql');

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard'
});

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    execute(member) {
        const insertQuery = 'INSERT INTO joins (user_id, user) VALUES (?, ?)';

        const joinerID = member.id
        const joinerUsername = member.user.username

        connection.query(insertQuery, [joinerID, joinerUsername], (error) => {
            if (error) {
                console.error('Error executing insert query:', error);
                return;
            }
        });
    },
};