const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: 'N/A', //zzzz not sure about this
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
