const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    author: {type: String, required: true, max: 100},
    message: {type: String, required: true},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    addDate: {type: Date, default: Date.now}

  }
);

module.exports = CommentSchema;