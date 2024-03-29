const AuthService = require('../auth/auth-service');

// Check bearer token for authorization
const requireAuth = (req, res, next) => {
	const authToken = req.get('Authorization') || '';

	if (!authToken.toLowerCase().startsWith('bearer ')) {
		return res.status(401).json({
			error: 'Missing authorization',
		});
	}
	const bearerToken = authToken.slice(7, authToken.length);

	try {
		const payload = AuthService.verifyJwt(bearerToken);

		AuthService.getUserByUsername(req.app.get('db'), payload.sub)
			.then((user) => {
				if (!user) {
					return res.status(401).json({
						error: 'Unauthorized request',
					});
				}
				req.user = user;
				next();
			})
			.catch(next);
	} catch (error) {
		next(error);
	}
};

module.exports = requireAuth;
