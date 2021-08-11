const mongoose = require('mongoose');

// define Data table types
const SchoolSchema = new mongoose.Schema({
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

const SchoolTable = mongoose.model('school_table', SchoolSchema);

module.exports = SchoolTable;