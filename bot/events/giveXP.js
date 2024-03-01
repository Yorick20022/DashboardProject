const { Events } = require('discord.js');
const mysql = require('mysql');

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard'
});

const giveRandomXp = () => {
    return Math.floor(Math.random() * 10) + 1;
}

const calculateLevel = (xp) => {
    // Define your level-up logic here, e.g., every 100 XP
    const levelThreshold = 100;
    return Math.floor(xp / levelThreshold);
}

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute(message) {
        if (message.author.bot) return;
        if (message.channel.type === 'dm') return;

        connection.query(`SELECT * FROM levels WHERE user_id = ${message.author.id}`, (err, results) => {
            if (err) throw err;

            const xpToAdd = giveRandomXp();
            const updatedXP = results.length === 0 ? xpToAdd : results[0].user_xp + xpToAdd;
            const updatedLevel = calculateLevel(updatedXP);

            if (results.length === 0) {
                connection.query(`INSERT INTO levels (user_id, user, user_xp, user_level) VALUES ('${message.author.id}', '${message.author.username}', ${updatedXP}, ${updatedLevel})`, err => {
                    if (err) throw err;
                });
            } else {
                connection.query(`UPDATE levels SET user_xp = ${updatedXP}, user_level = ${updatedLevel} WHERE user_id = ${message.author.id}`, err => {
                    if (err) throw err;
                    if (updatedLevel > results[0].user_level) {
                        message.reply(`You've leveled up to level **${updatedLevel}**!`);
                    }
                });
            }
        });
    },
};