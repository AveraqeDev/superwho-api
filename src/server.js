require('dotenv').config();

const knex = require('knex');
const app = require('./app');

const {
	PORT,
	NODE_ENV,
	DB_HOST,
	DB_PORT,
	DB_USER,
	DB_PASS,
	DB_NAME,
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

app.listen(PORT, () => {
	console.log(`Server running in ${NODE_ENV} mode on ${PORT}`);
});
