const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.get('/all', (req, res) => {
  Contact.find({})
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.send(error)
  })
});

router.post('/add', (req, res) => {
  console.log('a', req.body);
  const newContact = new Contact({
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  });
  newContact.save()
  .then(response => {
    res.json(response);
  })
  .catch(error => {
    res.send(error);
  })
});

router.post('/remove', (req, res) => {
  Contact.findOne({number: req.body.number})
  .then(response => {
    response.remove()
    res.send('Contact removed!')
  })
  .catch(error => {
    res.send(error)
  })
});

module.exports = router;
