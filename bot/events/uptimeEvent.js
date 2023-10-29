const { Events } = require('discord.js');
const mysql = require('mysql');

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard'
});

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        const insertQuery = 'INSERT INTO status (clientname) VALUES (?)';

        const clientName = client.user.username

        connection.query(insertQuery, clientName, (error) => {
            if (error) {
                console.error('Error executing insert query:', error);
                return;
            }
        });
    },
};