require('dotenv').config();

module.exports = {
	migrationDirectory: 'db/migrations',
	driver: 'pg',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database:
		process.env.NODE_ENV === 'test'
			? process.env.TEST_DB_NAME
			: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	ssl: !!process.env.SSL,
};
