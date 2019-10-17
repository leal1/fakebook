const mongoose = require('mongoose');
const CommentSchema = require('./comment');


const PostSchema = new mongoose.Schema(
  {
    author: {type: String, required: true, max: 100},
    message: {type: String, required: true},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    likeCount: {type: Number, required: true, default: 0},
    comments: [CommentSchema],
    addDate: {type: Date, default: Date.now}

  }
);

module.exports = mongoose.model('Post', PostSchema);