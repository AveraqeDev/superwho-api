const express = require('express');
const path = require('path');

const UsersService = require('./users-service');
const FavoritesService = require('./favorites-service');
const HerosService = require('../heros/heros-service');

const requireAuth = require('../middleware/jwt-auth');

const usersRouter = express.Router();
const bodyParser = express.json();

// Base users route endpoints
usersRouter.route('/').post(bodyParser, (req, res, next) => {
	const { username, password } = req.body;

	if (!req.body.username || !req.body.password) {
		return res.status(400).json({
			error: "Missing 'username' or 'password' in request body",
		});
	}

	const passwordError = UsersService.validatePassword(password);

	if (passwordError) {
		return res.status(400).json({
			error: passwordError,
		});
	}

	UsersService.hasUserWithUsername(req.app.get('db'), username)
		.then((match) => {
			if (match) {
				return res.status(400).json({
					error: 'Username already exists!',
				});
			}

			return UsersService.hashPassword(password).then((hashedPassword) => {
				const newUser = {
					username,
					password: hashedPassword,
				};

				return UsersService.insertUser(req.app.get('db'), newUser).then(
					(user) => {
						delete user.password;
						res
							.status(201)
							.location(path.posix.join(req.originalUrl, `/${user.id}`))
							.json(user);
					}
				);
			});
		})
		.catch(next);
});

// /favorites endpoints
usersRouter
	.route('/favorites')
	.post(requireAuth, bodyParser, (req, res, next) => {
		const { hero } = req.body;

		if (!hero) {
			return res.status(400).json({
				error: "Missing 'hero' in request body",
			});
		}

		FavoritesService.addUserFavorite(req.app.get('db'), req.user.id, hero)
			.then(() => {
				res.status(201).send();
			})
			.catch(next);
	})
	.get(requireAuth, (req, res, next) => {
		FavoritesService.getUserFavorites(req.app.get('db'), req.user.id)
			.then((favoriteHeros) => {
				const favorites = [];
				const requests = favoriteHeros.map(
					(favoriteHero) =>
						new Promise((resolve, reject) => {
							HerosService.getById(favoriteHero.hero)
								.then((hero) => {
									if (hero.response === 'success') resolve(hero);
									else reject(hero.error);
								})
								.catch((error) => reject(error));
						})
				);
				Promise.all(requests).then((heros) => {
					heros.forEach((hero) => {
						if (hero) favorites.push(hero);
					});
					res.status(200).json(favorites);
				});
			})
			.catch(next);
	})
	.delete(requireAuth, bodyParser, (req, res, next) => {
		const { hero } = req.body;

		if (!hero) {
			return res.status(400).json({
				error: "Missing 'hero' in request body",
			});
		}

		FavoritesService.removeUserFavorite(req.app.get('db'), req.user.id, hero)
			.then(() => {
				res.status(204);
			})
			.catch(next);
	});

module.exports = usersRouter;
