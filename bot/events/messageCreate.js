const { Events } = require('discord.js');
const mysql = require('mysql');

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard'
});

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute(message) {
        const insertQuery = 'INSERT INTO messages (message, message_id, author) VALUES (?, ?, ?)';

        const messageContent = message.content
        const messageID = message.id
        const messageSender = message.author.username

        connection.query(insertQuery, [messageContent, messageID, messageSender], (error) => {
            if (error) {
                console.error('Error executing insert query:', error);
                return;
            }
        });
    },
};