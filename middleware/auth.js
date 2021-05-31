const config = require('config');
const jwt = require('jsonwebtoken');

const auth = (request, response, next) => {
  const token = request.header('x-auth-token');

  if (!token) response.status(401).json({message: 'No token, authorization denied'});

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    request.user = decoded;
    next();
  } catch (error) {
    response.status(400).json({message: 'Token is not valid'});
  }
}

module.exports = auth;