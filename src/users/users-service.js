const bcrypt = require('bcryptjs');

// Regex to compare against for password requirements
const REGEX_UPPER_LOWER_NUMBER_SPECIAL =
	/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;

const UsersService = {
	// Check if a username already exists
	hasUserWithUsername(db, username) {
		return db('users')
			.where({ username })
			.first()
			.then((user) => !!user);
	},

	// Insert a new user
	insertUser(db, newUser) {
		return db
			.insert(newUser)
			.into('users')
			.returning('*')
			.then(([user]) => user);
	},

	// Update an existing user
	updateUser(db, id, newUserFields) {
		return db('users').where({ id }).update(newUserFields);
	},

	// Check if password passes requirements
	// > 8 charactesm < 72 characters,
	// no spaces at ends,
	// upper case,
	// lower case,
	// number,
	// special character
	validatePassword(password) {
		if (password.length < 8) {
			return 'Password must be longer than 8 characters';
		}

		if (password.length > 72) {
			return 'Password must be less than 72 charactes';
		}

		if (password.startsWith(' ') || password.endsWith(' ')) {
			return 'Password must not start or end with empty spaces';
		}
		if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
			return 'Password must container one upper case, lower case, number and special character';
		}
		return null;
	},

	// Hash a user's password for storing
	hashPassword(password) {
		return bcrypt.hash(password, 12);
	},
};

module.exports = UsersService;
