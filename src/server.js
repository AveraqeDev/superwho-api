require('dotenv').config();

const knex = require('knex');
const redis = require('redis');
const app = require('./app');

const {
	PORT,
	NODE_ENV,
	DB_HOST,
	DB_PORT,
	DB_USER,
	DB_PASS,
	DB_NAME,
	REDIS_HOST,
	REDIS_PORT,
	REDIS_PASS,
} = require('./config');

const db = knex({
	client: 'pg',
	connection: {
		host: DB_HOST,
		port: DB_PORT,
		user: DB_USER,
		password: DB_PASS,
		database: DB_NAME,
	},
});

app.set('db', db);

const redisClient = redis.createClient({
	host: REDIS_HOST,
	port: REDIS_PORT,
	password: REDIS_PASS,
});

redisClient.connect();

redisClient.on('error', (err) => {
	console.log(`Error ${err}`);
});

app.set('redis', redisClient);

app.listen(PORT, () => {
	console.log(`Server running in ${NODE_ENV} mode on ${PORT}`);
});
