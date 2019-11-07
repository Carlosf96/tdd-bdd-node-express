const { User } = require('../models/user.model');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');

describe('api/users', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  describe('GET /', () => {
    it('Should return 200 if returns all users', async () => {
      const users = [
        { firstName: 'john', lastName: 'doe', age: 1 },
        { firstName: 'jane', lastName: 'doee', age: 1 }
      ];
      await User.insertMany(users);
      console.log(users);
      const res = await request(app).get('/api/users');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
    describe('GET/:id', () => {
      it('Should return a user by id if a valid id is passed', async () => {
        const user = new User({
          firstName: 'Robert',
          lastName: 'Smith',
          age: 2
        });
        await user.save();
        const res = await request(app).get('/api/users/' + user._id);
        expect(res.status).to.equal(200);
        console.log(res.body);
        expect(res.body).to.have.property('firstName', user.firstName);
      });
      it('Should return 400 if an invalid object id is passed', async () => {
        const res = await request(app).get('/api/users/1');
        expect(res.status).to.equal(400);
      });
      it('Should return 404 if an valid object id is passed but does not exist', async () => {
        const res = await request(app).get('/api/users/111111111111');
        expect(res.status).to.equal(404);
      });
    });
  });
  describe('POST /', () => {
    it('Should return 201 and a user when the all request body is valid', async () => {
      const res = await request(app)
        .post('/api/users/')
        .send({
          firstName: 'first',
          lastName: 'last',
          age: 1
        });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('_id');
      expect(res.body.age).to.be.gt(0);
      expect(res.body).to.have.property('firstName');
      expect(res.body).to.have.property('lastName');
    });
    
    // add more tests to validate request body accordingly eg, make sure name is more than 1 character etc
  });

  describe('PUT /:id', () => {
    it('should update the existing order and return 200', async () => {
      const user = new User({
        firstName: 'first',
        lastName: 'last',
        age: 1
      });
      await user.save();

      const res = await request(app)
        .put('/api/users/' + user._id)
        .send({
          firstName: 'newfirst',
          lastName: 'newlast',
          age: 2
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('firstName');
    });
  });

  describe('DELETE /:id', () => {
    it('should delete requested id and return response 200', async () => {
      const user = new User({
        firstName: 'first',
        lastName: 'last',
        age: 1
      });
      await user.save();

      const res = await request(app).delete('/api/users/' + user._id);
      expect(res.status).to.be.equal(200);
    });

    it('should return 404 when deleted user is requested', async () => {
      const user = new User({
        firstName: 'first',
        lastName: 'last',
        age: 1
      });
      await user.save();

      let res = await request(app).delete('/api/users/' + user._id);
      expect(res.status).to.be.equal(200);

      res = await request(app).get('/api/users/' + user._id);
      expect(res.status).to.be.equal(404);
    });
  });
});
