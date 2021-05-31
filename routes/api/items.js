const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Item = require('../../models/Item');

router.get('/', (request, response) => {
  Item.find()
    .sort({date: -1})
    .then(items => response.json(items));
});

router.post('/', auth, (request, response) => {
  const newItem = new Item({
    name: request.body.name
  });
  newItem.save().then(item => response.json(item));
});

router.delete('/:id', auth, (request, response) => {
  Item.findById(request.params.id)
    .then(item => item.remove().then(() => response.json({success: true})))
    .catch(error => response.status(404).json({success: false}));
})

module.exports = router;