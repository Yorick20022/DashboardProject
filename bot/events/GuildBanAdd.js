const { Events, AuditLogEvent } = require('discord.js');
const mysql = require('mysql');

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard'
});

module.exports = {
    name: Events.GuildAuditLogEntryCreate,
    once: false,
    async execute(entry, guild) {
        if (entry.action === AuditLogEvent.MemberBanAdd) {

            const insertQuery = 'INSERT INTO bans (user_id, user, executor, executor_id) VALUES (?, ?, ?, ?)';

            const userID = entry.target.id
            const userName = entry.target.username
            const executor = entry.executor.username
            const executorID = entry.executor.id

            connection.query(insertQuery, [userID, userName, executor, executorID], (error) => {
                if (error) {
                    console.error('Error executing insert query:', error);
                    return;
                }
            });

        }
    },
};