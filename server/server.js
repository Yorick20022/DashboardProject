import mysql from 'mysql2'
import Fastify from 'fastify'
import cors from '@fastify/cors'
const fastify = Fastify({
    logger: false
})

await fastify.register(cors, {
    falseOrigin: true,
})

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "dashboard"
})

fastify.get('/', (request, reply) => {
    reply.send("Hello world")
})

fastify.get('/result', (request, reply) => {
    db.query(
        'SELECT COUNT(message) FROM messages',
        function (err, results, fields) {
            if (err) {
                reply.status(500).send({ error: 'An error occurred' });
                return;
            }
            const fullResult = results[0]['COUNT(message)'];
            const responseData = [{ fullResult }]; // Format the response as an array of objects
            reply.send(responseData);
        }
    );
});


fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err
    console.log(`Server is now listening on ${address}`);
})