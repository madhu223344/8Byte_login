const request = require('supertest');
const express = require('express');
const session = require('express-session');
const app = require('../src/server'); // make sure server exports the app

describe('User Authentication Routes', () => {
  it('should load the login page', async () => {
    const res = await request(app).get('/login');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Login');
  });
it('should fail login with invalid credentials', async () => {
  const res = await request(app)
    .post('/login')
    .send({ email: 'invalid@example.com', password: 'wrongpass' }); // Send both email and password
  expect(res.statusCode).toBe(401);
});
});