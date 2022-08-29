const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const makeKnexInstance = () => {
	return knex({
		client: 'pg',
		connection: process.env.TEST_DATABASE_URL,
	});
};

const makeUsersArray = () => {
	return [
		{
			id: 1,
			username: 'testuser1',
			password: 'Password1!',
		},
		{
			id: 2,
			username: 'testuser2',
			password: 'Password2!',
		},
		{
			id: 3,
			username: 'testuser3',
			password: 'Password3!',
		},
		{
			id: 4,
			username: 'testuser4',
			password: 'Password4!',
		},
		{
			id: 5,
			username: 'testuser5',
			password: 'Password5!',
		},
	];
};

const makeUsersArraySeeds = () => {
	return [
		{
			username: 'testuser1',
			password: 'Password1!',
		},
		{
			username: 'testuser2',
			password: 'Password2!',
		},
		{
			username: 'testuser3',
			password: 'Password3!',
		},
		{
			username: 'testuser4',
			password: 'Password4!',
		},
		{
			username: 'testuser5',
			password: 'Password5!',
		},
	];
};

const makeFavoritesArray = () => {
	return [
		{
			user_id: 1,
			hero: 1,
		},
		{
			user_id: 2,
			hero: 2,
		},
		{
			user_id: 3,
			hero: 3,
		},
		{
			user_id: 4,
			hero: 4,
		},
		{
			user_id: 5,
			hero: 5,
		},
	];
};

const makeAuthHeader = (user, secret = process.env.JWT_SECRET) => {
	const token = jwt.sign({ id: user.id, username: user.username }, secret, {
		subject: user.username,
		algorithm: 'HS256',
	});
	return `Bearer ${token}`;
};

const cleanTables = (db) => {
	return db.transaction((trx) =>
		trx
			.raw(
				`TRUNCATE
          "users",
          "favorites"`
			)
			.then(() =>
				Promise.all([
					trx.raw('ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1'),
					trx.raw("SELECT setval('users_id_seq', 0)"),
				])
			)
	);
};

const seedUsers = (db, users) => {
	const preppedUsers = users.map((user) => ({
		...user,
		password: bcrypt.hashSync(user.password, 1),
	}));

	return db.transaction(async (trx) => {
		await trx.into('users').insert(preppedUsers);

		await trx.raw("SELECT setval('users_id_seq', ?)", [
			users[users.length - 1].id,
		]);
	});
};

const seedFavorites = (db, favorites) => {
	return db.transaction(async (trx) => {
		await trx.into('favorites').insert(favorites);
	});
};

module.exports = {
	makeKnexInstance,
	makeUsersArray,
	makeFavoritesArray,
	makeAuthHeader,
	cleanTables,
	seedUsers,
	seedFavorites,
	makeUsersArraySeeds,
};
