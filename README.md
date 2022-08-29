# SuperWho?(API)

## Summary

A Node, Express API built to connect the SuperWho? React client to a Postgres database

## Endpoints

### This is a JSON API server, it both expects JSON in the request body and returns JSON in the response.

#### /api/auth

- `POST` Creates an auth token. Requires valid `username` and `password` (created when you make a user account) in the request body. Returns a JWT token named `authToken`.
- `PUT` Refreshes the auth token. Requires valid `username` and `userID` in the request body. Returns a new JWT token.

#### /api/users

- `POST` Inserts a new user into the `users` table using the `username` and `password` in the request body, generating a new ID. Returns the newly created user from the database.
- **/favorites**
  - `GET` Retrieves all entries from the `favorites` table, no body required in request, but does require `Authorization` token in header. Returns array of integers mapping to `SuperHero API IDs`.
    - Example:
      ```json
      [1, 5, 15, 21, 104]
      ```
  - `POST` Inserts a new favorite record into the `favorites` table. Requires `hero` in request body and `Authorization` token in header. Returns no content.
  - `DELETE` Removes a favorite record from the `favorites` table. Requires `hero` in request body and `Authorization` token in header. Returns no content.

#### /api/heros/

- **/search/:term**
  - `GET` Uses the [SuperHero API](https://superheroapi.com/) to search for superheros matching the search `term`. Returns a list of superhero instances matching the search `term`.
- **/:id**
  - `GET` Uses the [SuperHero API](https://superheroapi.com/) to get a single superhero by their `SuperHero API ID`. Returns a superhero instance.

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run tests `npm test`

Run ESLint `npm run lint`

Migrate PostgreSQL database locally `npm run migrate`

Migrate PostgreSQL test database locally `npm run migrate:test`

Seed PostgreSQL database locally `npm run seed`

Seed PostgreSQL test database locally `npm run seed:test`

## Dependencies

- [axios](https://www.npmjs.com/package/axios) - `v0.25.0`
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - `v2.4.3`
- [cors](https://www.npmjs.com/package/cors) - `v2.8.5`
- [dotenv](https://www.npmjs.com/package/dotenv) - `v14.3.2`
- [express](https://www.npmjs.com/package/express) - `v4.17.2`
- [helmet](https://www.npmjs.com/package/helmet) - `v5.0.2`
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - `v8.5.1`
- [knex](https://www.npmjs.com/package/knex) - `v1.0.1`
- [morgan](https://www.npmjs.com/package/morgan) - `v1.10.0`
- [pg](https://www.npmjs.com/package/pg) - `v8.7.1`

## Dev Dependencies

- [chai](https://www.npmjs.com/package/chai) - `v4.3.6`
- [eslint](https://www.npmjs.com/package/eslint) - `v8.7.0`
- [mocha](https://www.npmjs.com/package/mocha) - `v9.2.0`
- [nodemon](https://www.npmjs.com/package/nodemon) - `v2.0.15`
- [postgrator-cli](https://www.npmjs.com/package/postgrator-cli) = `v4.0.0`
- [supertest](https://www.npmjs.com/package/supertest) - `v6.2.2`
