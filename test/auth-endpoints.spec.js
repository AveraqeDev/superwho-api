const jwt = require('jsonwebtoken');
const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');
const { expect } = require('chai');

describe('User Endpoints', () => {
  let db;

  const testUsers = helpers.makeUsersArray();
  const testUser = testUsers[0];

  before('make knex instance', () => {
    db = helpers.makeKnexInstance();
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('POST /api/auth/login', () => {
    beforeEach('insert users', () => helpers.seedUsers(db, testUsers));

    describe('Given valid user login credentials', () => {
      it('responds with 200 and a JWT', () => {
        const userInfo = {
          username: testUser.username,
          password: testUser.password
        };

        return supertest(app)
          .post('/api/auth/login')
          .send(userInfo)
          .expect(200)
          .expect(res => {
            expect(res.body).to.have.property('authToken');
            expect(res.body.authToken).to.be.a('string');
          });
      });
    });
  });
});
