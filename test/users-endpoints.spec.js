const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');
const { expect } = require('chai');

describe('User Endpoints', () => {
  let db;

  const testUsers = helpers.makeUsersArray();
  const testUser = testUsers[0];

  const testFavorites = helpers.makeFavoritesArray();

  before('make knex instance', () => {
    db = helpers.makeKnexInstance();
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('POST /api/users', () => {
    describe('Given a valid user', () => {
      it('responds with 201, user with no password', () => {
        const newUser = {
          username: 'testuser123',
          password: 'Password1!'
        };

        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property('id');
            expect(res.body.username).to.eql(newUser.username);
            expect(res.body).to.not.have.property('password');
            expect(res.headers.location).to.eql(`/api/users/${res.body.id}`);
          });
      });
    });
  });

  describe('POST /api/users/favorites', () => {
    describe('Given a valid heroId and authorization', () => {
      beforeEach('seed users', () => helpers.seedUsers(db, testUsers));
      it('responds with 201', () => {
        const testData = {
          hero: 1
        };
        return supertest(app)
          .post('/api/users/favorites')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .send(testData)
          .expect(201);
      });
    });
  });

  describe('GET /api/users/favorites', () => {
    describe('Given valid authorization', () => {
      beforeEach('seed users and favorites', () => {
        helpers.seedUsers(db, testUsers);
        helpers.seedFavorites(db, testFavorites);
      });
      it('responds with 200 and array of favorites', () => {
        return supertest(app)
          .get('/api/users/favorites')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body).to.be.a('array');
          });
      });
    });
  });
});