const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setPresence({ activities: [{ name: 'Javascript' }] });

		const mysql = require('mysql');
		const connection = mysql.createConnection({

			host: 'localhost',
			user: 'root',
			password: '',
			database: 'dashboard'
		});

		connection.connect(function (err) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}

			console.log('connected as id ' + connection.threadId);
		});
	},
};
