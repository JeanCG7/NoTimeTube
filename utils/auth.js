const jwt = require('express-jwt');

const getTokenFromCookie = (req) => {
  const {cookies: {token}} = req;

  if (token) {
    return token;
  }
  return null;
};

const auth = {
  required: jwt({
    secret: process.env.SECRET,
    userProperty: 'payload',
    getToken: getTokenFromCookie,
  }),
  optional: jwt({
    secret: process.env.SECRET,
    userProperty: 'payload',
    getToken: getTokenFromCookie,
    credentialsRequired: false,
  }),
};

module.exports = auth;
