const express = require('express');
const path = require('path');

const UsersService = require('./users-service');
const FavoritesService = require('./favorites-service');

const requireAuth = require('../middleware/jwt-auth');

const usersRouter = express.Router();
const bodyParser = express.json();

// Base users route endpoints
usersRouter
  .route('/')
  .post(bodyParser, (req, res, next) => {
    const { username, password } = req.body;

    for(const field of ['username', 'password'])
      if(!req.body[field])
        return res.status(400).json({
          error: `Missing '${field} in request body`
        });

    const passwordError = UsersService.validatePassword(password);

    if(passwordError)
      return res.status(400).json({
        error: passwordError
      });

    UsersService.hasUserWithUsername(
      req.app.get('db'),
      username
    )
      .then(match => {
        if(match)
          return res.status(400).json({
            error: 'Username already exists!'
          });
        
        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              username,
              password: hashedPassword
            };

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(user);
              }); 
          });
      })
      .catch(next);
  });

// /favorites endpoints
usersRouter
  .route('/favorites')
  .post(requireAuth, bodyParser, (req, res, next) => {
    const { hero } = req.body;

    if(!hero) 
      return res.status(400).json({
        error: 'Missing \'hero\' in request body'
      });

    FavoritesService.addUserFavorite(
      req.app.get(db),
      req.user.id,
      hero
    )
      .then(() => {
        res.status(201);
      })
      .catch(next);
  })
  .get(requireAuth, (req, res, next) => {
    FavoritesService.getUserFavorites(
      req.app.get('db'), 
      req.user.id
    )
      .then(favorites => {
        res.status(200).json(favorites);
      })
      .catch(next);
  })
  .delete(requireAuth, bodyParser, (req, res, next) => {
    const { hero } = req.body;
    
    if(!hero)
      return res.status(400).json({
        error: 'Missing \'hero\' in request body'
      });

    FavoritesService.removeUserFavorite(
      req.app.get('db'),
      req.user.idm,
      hero
    )
      .then(() => {
        res.status(204);
      });
  });

module.exports = usersRouter;