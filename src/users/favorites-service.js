const FavoritesService = {
  // Get a users favorites
  getUserFavorites(db, id) {
    return db('favorites')
      .select('hero')
      .where('user_id', id);
  },

  // Insert a user favorite
  addUserFavorite(db, user_id, hero) {
    return db
      .insert({ user_id, hero })
      .into('favorites');
  },

  // Remove a user favorite
  removeUserFavorite(db, user_id, hero) {
    return db('favorites')
      .where({ user_id, hero })
      .del();
  }
};

module.exports = FavoritesService;