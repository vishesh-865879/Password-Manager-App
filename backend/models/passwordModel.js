const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  site: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  type: {
    type: String,
    enum: ['password', 'passkey', 'code', 'wifi', 'security'],
    default: 'password',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Password', passwordSchema);