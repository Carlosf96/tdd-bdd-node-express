const { User } = require('../models/user.model');
const request = require('supertest');
const expect = require('mocha').expect;
const app  = require('../app');

describe('api/users', ()=>{
  beforeEach(async () => {
    await User.deleteMany({});
  });
  describe('GET /', ()=>{
    it('Should return all users', async ()=>{
      const users  = [{firstName: 'john',lastName: 'doe', age: 1},{firstName: 'jane',lastName: 'doe', age: 1}];
      await User.insertMany(users);
      console.log(users);
      const res = request(app).get('api/users');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
    describe('GET/:id', ()=>{
      it('Should return a user by id if a valid id is passed', async ()=>{
        const user = new User ({
          firstName: 'Robert',
          lastName: 'Smith',
          age: 2
        });
        await user.save();
        const result = await request(app).get('api/users' + user.__id);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('firstName', user.firstName);
      })
      it('Should return 400 if an invalid object id is passed', async ()=>{
        const result = await request(app).get('api/users/1');
        expect(res.status).to.equal(400);
      })
      it('Should return 404 if an valid object id is passed but does not exist', async ()=>{
        const result = await request(app).get('api/users/1111111111111');
        expect(res.status).to.equal(404);
      })
    });
  })
})