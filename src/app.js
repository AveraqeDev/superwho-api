require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

// Route imports
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const herosRouter = require('./heros/heros-router');

// Create express app
const app = express();

// Setup morgan option based on environment
const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

// Cors middleware for allowing cross origin
app.use(cors());
// Morgan middleware for logging information
app.use(morgan(morganOption));
// Helmet middleware for hiding our server type
app.use(helmet());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/heros', herosRouter);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
	let response;
	console.error(error);
	if (NODE_ENV === 'production') {
		response = { error: { message: 'Internal server error' } };
	} else {
		response = { error: { message: error.message, error } };
	}
	res.status(500).json(response);
});

module.exports = app;
