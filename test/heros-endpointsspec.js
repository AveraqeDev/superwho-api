const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe.only('Heros Endpoints', () => {
	describe('GET /api/heros/search/:term', () => {
		describe('Given valid search term', () => {
			it('responds with 200 and array of heros', () => {
				const term = 'batman';
				return supertest(app)
					.get(`/api/heros/search/${term}`)
					.expect(200)
					.expect((res) => {
						expect(res.body).to.be.a('array');
					});
			});
		});
	});

	describe('GET /api/heros/:id', () => {
		describe('Given valid hero id', () => {
			it('responds with 200 hero object', () => {
				const id = 1;
				return supertest(app)
					.get(`/api/heros/${id}`)
					.expect(200)
					.expect((res) => {
						expect(res.body).to.have.property('response');
						expect(res.body.response).to.eql('success');
						expect(res.body).to.have.property('id');
						expect(res.body.id).to.eql('1');
					});
			});
		});
	});
});
