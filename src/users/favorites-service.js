const FavoritesService = {
  // Get a users favorites
  getUserFavorites(db, id) {
    return db('favorites')
      .select('hero')
      .where('user', id);
  },

  // Insert a user favorite
  addUserFavorite(db, user, hero) {
    return db
      .insert({ user, hero })
      .into('favorites');
  },

  // Remove a user favorite
  removeUserFavorite(db, user, hero) {
    return db('favorites')
      .where({ user, hero })
      .del();
  }
};

module.exports = FavoritesService;