const express = require('express');

const HerosService = require('./heros-service');

const herosRouter = express.Router();

herosRouter
	.get('/search/:term', (req, res, next) => {
		const { term } = req.params;
		HerosService.searchForHero(req.app.get('redis'), term)
			.then((heros) => {
				if (heros.response !== 'success') {
					res.status(400).json({ error: { message: heros.error } });
				} else {
					res.status(200).json(heros.results);
				}
			})
			.catch(next);
	})
	.get('/:id', (req, res, next) => {
		const { id } = req.params;
		HerosService.getById(req.app.get('redis'), id)
			.then((hero) =>
				hero.response !== 'success'
					? res.status(400).json({ error: { message: hero.error } })
					: res.status(200).json(hero)
			)
			.catch(next);
	});

module.exports = herosRouter;
