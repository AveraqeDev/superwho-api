module.exports = {
	// Server Info
	PORT: process.env.PORT || 8000,
	NODE_ENV: process.env.NODE_ENV || 'development',
	// Database Info
	DB_HOST: process.env.DB_HOST || 'localhost',
	DB_PORT: process.env.DB_PORT || 5432,
	DB_USER: process.env.DB_USER || 'postgres',
	DB_PASS: process.env.DB_PASS || 'postgres',
	DB_NAME: process.env.DB_NAME || 'superwho',
	// JWT Info
	JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
	// SuperHeroAPI Info
	HERO_API: process.env.HERO_API,
};
