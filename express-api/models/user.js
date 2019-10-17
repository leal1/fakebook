const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true},
    firstName: {type: String, required: true, max: 100},
    hash: {type: String, required: true},
    lastName: {type: String, required: true, max: 100},
    joinDate: {type: Date, default: Date.now}
  }
);

module.exports = mongoose.model('User', UserSchema);