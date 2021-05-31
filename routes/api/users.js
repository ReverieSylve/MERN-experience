const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

router.post('/', (request, response) => {
  const {name, email, password} = request.body;

  if (!name || !email || !password) {
    return response.status(400).json({message: 'Please enter all fields'});
  }

  User.findOne({email})
    .then(user => {
      if (user) return response.status(400).json({message: 'User already exists'});

      const newUser = new User({
        name,
        email,
        password
      });

      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser.save()
            .then(user => {
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
        })
      })
    });
});

module.exports = router;