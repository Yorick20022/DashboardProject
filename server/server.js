import mysql from 'mysql2/promise'
import Fastify from 'fastify'
import cors from '@fastify/cors'
const fastify = Fastify({
    logger: false
})

await fastify.register(cors, {
    falseOrigin: true,
})

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard',
});

fastify.decorate('mysql', pool);

fastify.get('/result', async (request, reply) => {
    try {
        const connection = await fastify.mysql.getConnection();

        const
            [queryResult1, queryResult2, queryResult3, queryResult4, queryResult5, queryResult6, queryResult7, queryResult8, queryResult9, queryResult10, queryResult11, queryResult12, queryResult13, queryResult14, queryResult15] = await Promise.all([
                connection.query('SELECT COUNT(message) FROM messages'),
                connection.query('SELECT COUNT(user) FROM bans'),
                connection.query('SELECT COUNT(user) FROM timeouts'),
                connection.query('SELECT COUNT(user) FROM kicks'),
                connection.query('SELECT message FROM messages ORDER BY id Desc LIMIT 1'),
                connection.query('SELECT user FROM bans ORDER BY id DESC LIMIT 1'),
                connection.query('SELECT user FROM kicks ORDER BY id DESC LIMIT 1'),
                connection.query('SELECT user FROM timeouts ORDER BY id DESC LIMIT 1'),
                connection.query('SELECT user FROM joins ORDER BY id DESC LIMIT 1'),
                connection.query('SELECT uptime FROM status ORDER BY id DESC LIMIT 1'),
                connection.query('SELECT author, COUNT(*) AS message_count FROM messages GROUP BY author_id ORDER BY message_count DESC LIMIT 1; '),
                connection.query('SELECT user, COUNT(*) AS ban_count FROM bans GROUP BY user_id ORDER BY ban_count DESC LIMIT 1; '),
                connection.query('SELECT `user`, COUNT(*) AS timeout_count FROM timeouts GROUP BY user_id ORDER BY timeout_count DESC LIMIT 1; '),
                connection.query('SELECT `user`, COUNT(*) AS kick_count FROM kicks GROUP BY user_id ORDER BY kick_count DESC LIMIT 1; '),
                connection.query('SELECT `user`, `user_level`, `user_xp` FROM levels ORDER BY user_level DESC')
            ])

        connection.release();

        const allMessages = queryResult1[0][0]['COUNT(message)'];
        const allBans = queryResult2[0][0]['COUNT(user)'];
        const allTimeouts = queryResult3[0][0]['COUNT(user)'];
        const allKicks = queryResult4[0][0]['COUNT(user)'];
        const lastMessage = queryResult5[0][0]['message'];
        const lastBan = queryResult6[0][0]['user'];
        const lastKick = queryResult7[0][0]['user'];
        const lastTimeout = queryResult8[0][0]['user'];
        const lastJoin = queryResult9[0][0]['user'];
        const mostMessages = queryResult11[0][0]['author'];
        const userWithMostMessages = queryResult11[0][0]['message_count'];
        const mostBans = queryResult12[0][0]['user'];
        const userWithMostBans = queryResult12[0][0]['ban_count'];
        const mostTimeouts = queryResult13[0][0]['user'];
        const userWithMostTimeouts = queryResult13[0][0]['timeout_count'];
        const mostKicks = queryResult14[0][0]['user'];
        const userWithMostKicks = queryResult14[0][0]['kick_count'];
        const userLevel = queryResult15[0]

        const originalUptime = queryResult10[0][0]['uptime'];
        const originalDate = new Date(originalUptime);
        const timeStampNow = new Date();
        const timeNow = timeStampNow.getTime();
        const timeUptime = originalDate.getTime();
        const timeDifference = timeNow - timeUptime;

        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Calculate days
        const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Calculate hours
        const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes
        const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000); // Calculate seconds
        const days = daysDifference;
        const hours = hoursDifference;
        const minutes = minutesDifference;
        const seconds = secondsDifference;

        const responseData = [{ allMessages, allBans, allTimeouts, allKicks, lastMessage, lastBan, lastKick, lastTimeout, lastJoin, days, hours, minutes, seconds, mostMessages, userWithMostMessages, mostBans, userWithMostBans, mostTimeouts, userWithMostTimeouts, mostKicks, userWithMostKicks, userLevel }];

        reply.send(responseData);
    } catch (error) {
        reply.status(500).send({ error: 'An error occurred', message: error.message });
    }
});

fastify.listen({ port: 5000 }, (err, address) => {
    if (err) throw err
    console.log(`Server is now listening on ${address}`);
})