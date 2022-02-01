const FavoritesService = {
	// Get a users favorites
	getUserFavorites(db, id) {
		return db('favorites').select('hero').where('user_id', id);
	},

	// Insert a user favorite
	addUserFavorite(db, userId, hero) {
		return db.insert({ user_id: userId, hero }).into('favorites');
	},

	// Remove a user favorite
	removeUserFavorite(db, userId, hero) {
		return db('favorites').where({ user_id: userId, hero }).del();
	},
};

module.exports = FavoritesService;
