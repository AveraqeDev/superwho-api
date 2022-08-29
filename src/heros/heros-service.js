const axios = require('axios');
const config = require('../config');

const instance = axios.create({
	baseURL: config.HERO_API,
});

const HerosService = {
	searchForHero(term) {
		return instance.get(`/search/${term}`).then((res) => res.data);
	},

	getById(id) {
		return instance.get(`/${id}`).then((res) => res.data);
	},
};

module.exports = HerosService;
