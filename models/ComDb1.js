const mongoose = require('mongoose');

// define Data table types
const PostingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }

});

const ComDb1 = mongoose.model('com_db1', PostingSchema);

module.exports = ComDb1;