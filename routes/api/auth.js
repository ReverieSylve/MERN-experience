const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.post('/', (request, response) => {
  const {email, password} = request.body;

  if (!email || !password) {
    return response.status(400).json({message: 'Please enter all fields'});
  }

  User.findOne({email})
    .then(user => {
      if (!user) return response.status(400).json({message: 'User Does not exist'});

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return response.status(400).json({message: 'Invalid credentials'});
          jwt.sign(
            {id: user.id},
            config.get('jwtSecret'),
            {expiresIn: 3600},
            (error, token) => {
              if (error) throw error;
              response.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        })
    });
});

router.get('/user', auth, (request, response) => {
  User.findById(request.user.id)
    .select('-password')
    .then(user => response.json(user));
});

module.exports = router;