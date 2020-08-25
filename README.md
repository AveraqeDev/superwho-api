# SuperWho?(API)

## Summary
A Node, Express API built to connect the SuperWho? React client to a Postgres database


## Endpoints
### This is a JSON API server, it both expects JSON in the request body and returns JSON in the response.
### /api is the root path for all of these routes (i.e.: localhost:8000/api/auth)
#### /auth
- POST Creates an auth token. Requires valid ```username``` and ```password``` (created when you make a user account) in the request body. Returns a JWT token named ```authToken```.
- PUT Refreshes the auth token. Requires valid ```username``` and ```userID``` in the request body. Returns a new JWT token.

#### /users
- POST Inserts a new user into the ```users``` table using the ```username``` and ```password``` in the request body, generating a new ID. Returns the newly created user from the database.
- **/favorites**
  - GET Retrieves all entries from the ```favorites``` table, no body required in request, but does require ```Authorization``` token in header. Returns array of integers.
      - Example:\
        [
          1,
          5,
          15,
          21,
          104
        ]
  - POST Inserts a new favorite record into the ```favorites``` table. Requires ```hero``` in request body and ```Authorization``` token in header. Returns no content.
  - DELETE Removes a favorite record from the ```favorites``` table. Requires ```hero``` in request body and ```Authorization``` token in header. Returns no content.

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

Migrate PostgreSQL database locally `npm run migrate`

Migrate PostgreSQL test database locally `npm run migrate:test`

Migrate PostgreSQL production database remotely `npm run migrate:production`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will run tests, migrate production database, and push to this remote's master branch.