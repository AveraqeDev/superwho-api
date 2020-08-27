module.exports = {
  // Server Info
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  // Database Info
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/superwho',
  // JWT Info
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  // SuperHeroAPI Info
  HERO_API: process.env.HERO_API
};
