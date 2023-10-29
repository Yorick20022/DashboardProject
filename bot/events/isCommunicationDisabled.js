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
        if (entry.action === AuditLogEvent.MemberUpdate && entry.changes[0].key === 'communication_disabled_until') {
            {
                const userID = entry.target.id
                const userName = entry.target.username
                const executor = entry.executor.username
                const executorID = entry.executor.id
                const timeOut = entry
                const reason = timeOut.reason ?? "No reason provided"

                const insertQuery = 'INSERT INTO timeouts (user_id, user, executor, executor_id, reason) VALUES (?, ?, ?, ?, ?)';

                connection.query(insertQuery, [userID, userName, executor, executorID, reason], (error) => {
                    if (error) {
                        console.error('Error executing insert query:', error);
                        return;
                    }
                });
            }
        }
    },
};