const mongoose = require('mongoose');

const PasswordResetSchema = mongoose.Schema({
 email: {
        type: String,
        required: true
    },
  resetlink: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PasswordReset', PasswordResetSchema);