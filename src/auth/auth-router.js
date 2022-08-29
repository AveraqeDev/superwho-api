const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const bodyParser = express.json();

// Base /auth endpoints
authRouter
	// Login a user
	.post('/login', bodyParser, (req, res, next) => {
		const { username, password } = req.body;
		const loginUser = {
			username,
			password,
		};

		if (!username || !password) {
			return res.status(400).json({
				error: 'Invalid Credentials',
			});
		}
		AuthService.getUserByUsername(req.app.get('db'), loginUser.username)
			.then((dbUser) => {
				if (!dbUser) {
					return res.status(400).json({
						error: 'Invalid Credentials',
					});
				}

				return AuthService.comparePasswords(
					loginUser.password,
					dbUser.password
				).then((match) => {
					if (!match) {
						return res.status(400).json({
							error: 'Invalid Credentials',
						});
					}

					const sub = dbUser.username;
					const payload = {
						id: dbUser.id,
						username: dbUser.username,
					};
					res.send({
						authToken: AuthService.createJwt(sub, payload),
					});
				});
			})
			.catch(next);
	});

module.exports = authRouter;
