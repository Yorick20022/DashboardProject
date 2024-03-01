const { Events } = require('discord.js');
const mysql = require('mysql');

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard'
});

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,
    execute(member) {

        const personLeaveId = member.id

        const deleteQuery =
            `
            DELETE joins, levels
            FROM joins
            INNER JOIN levels ON joins.user_id = levels.user_id
            WHERE joins.user_id = ${personLeaveId};
            `;

        connection.query(deleteQuery, [personLeaveId], (error) => {
            if (error) {
                console.error('Error executing insert query:', error);
                return;
            }
        });
    },
};