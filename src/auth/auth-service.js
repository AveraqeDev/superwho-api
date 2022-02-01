const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const AuthService = {
	// Get a user by their username
	getUserByUsername(db, username) {
		return db('users')
			.where({
				username,
			})
			.first();
	},

	// Compare given password to stored password
	comparePasswords(password, hash) {
		return bcrypt.compare(password, hash);
	},

	// Create JWT for user
	createJwt(subject, payload) {
		return jwt.sign(payload, config.JWT_SECRET, {
			subject,
			algorithm: 'HS256',
		});
	},

	// Verify given JWT is valid
	verifyJwt(token) {
		return jwt.verify(token, config.JWT_SECRET, {
			algorithms: ['HS256'],
		});
	},
};

module.exports = AuthService;
