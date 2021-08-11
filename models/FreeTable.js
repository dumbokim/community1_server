const mongoose = require('mongoose');

// define Data table types
const FreeSchema = new mongoose.Schema({
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
    required: false,
  }

});

const FreeTable = mongoose.model('free_table', FreeSchema);

module.exports = FreeTable;