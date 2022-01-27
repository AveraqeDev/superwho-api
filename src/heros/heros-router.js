const express = require('express');

const HerosService = require('./heros-service');

const herosRouter = express.Router();

herosRouter
	.get('/search/:term', (req, res, next) => {
		const { term } = req.params;
		HerosService.searchForHero(term)
			.then((heros) => {
				heros.response !== 'success'
					? res.status(400).json({ error: { message: heros.error } })
					: res.status(200).json(heros.results);
			})
			.catch(next);
	})
	.get('/:id', (req, res, next) => {
		const { id } = req.params;
		HerosService.getById(id)
			.then((hero) => (hero.response !== 'success'
				? res.status(400).json({ error: { message: hero.error } })
				: res.status(200).json(hero)))
			.catch(next);
	});

module.exports = herosRouter;
