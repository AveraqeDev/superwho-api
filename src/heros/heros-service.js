const axios = require('axios');
const config = require('../config');

const instance = axios.create({
	baseURL: config.HERO_API,
});

const HerosService = {
	searchForHero(redis, term) {
		return redis.get(term).then((cachedHero) => {
			if (cachedHero) {
				return JSON.parse(cachedHero);
			}
			return instance
				.get(`/search/${term}`)
				.then((res) => res.data)
				.then((hero) => {
					redis.set(term, JSON.stringify(hero));
					redis.expire(term, 12 * 60 * 60);
					return hero;
				});
		});
	},

	getById(redis, id) {
		return redis.get(`hero-${id}`).then((cachedHero) => {
			if (cachedHero) {
				return JSON.parse(cachedHero);
			}
			return instance
				.get(`/${id}`)
				.then((res) => res.data)
				.then((hero) => {
					redis.set(`hero-${id}`, JSON.stringify(hero));
					redis.expire(`hero-${id}`, 12 * 60 * 60);
					return hero;
				});
		});
	},
};

module.exports = HerosService;
