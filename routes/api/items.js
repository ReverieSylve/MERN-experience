const express = require('express');
const router = express.Router();

const Item = require('../../models/item');

router.get('/', (request, response) => {
  Item.find()
    .sort({date: -1})
    .then(items => response.json(items));
});

router.post('/', (request, response) => {
  const newItem = new Item({
    name: request.body.name
  });
  newItem.save().then(item => response.json(item));
});

router.delete('/:id', (request, response) => {
  Item.findById(request.params.id)
    .then(item => item.remove().then(() => response.json({success: true})))
    .catch(error => response.status(404).json({success: false}));
})

module.exports = router;