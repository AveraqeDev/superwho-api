const express = require('express');

const HerosService = require('./heros-service');

const herosRouter = express.Router();

herosRouter
  .get('/search/:term', (req, res, next) => {
    const { term } = req.params;
    try {
      HerosService.searchForHero(term)
        .then(heros => {
          (heros.response !== 'success')
            ? res.status(400).json({error: heros.error})
            : res.status(200).json(heros.results);
        });
    } catch(error) {
      next(error);
    }
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    try {
      HerosService.getById(id)
        .then(hero => 
          (hero.response !== 'success')
            ? res.status(400).json({error: hero.error})
            : res.status(200).json(hero)
        );
    } catch(error) {
      next(error);
    }
  });

module.exports = herosRouter;