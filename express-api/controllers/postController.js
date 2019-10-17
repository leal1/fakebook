const mongoose = require('mongoose');
const Post = require('../models/post');
const { body, sanitizeBody, validationResult } = require('express-validator');

exports.postList = function(req, res, next) {
  // find posts and sort by most recent
  Post.find({})
    .sort('-addDate').exec((err, posts)=> {
      if(err) return next(err);
      res.status(200).json(posts);
    })
}

exports.likeOrUnlikePost = [
   // validate params
   body('userId', 'Message required').isLength({min: 1}).trim(),
   // sanitize
   sanitizeBody('*').escape(),
   async (req, res, next) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array(), userId: req.body.userId});
     } else {
      try {
        // Find post and check if User liked post
        let userId = req.body.userId;
        let postId = req.params.id;
        let post = await Post.find(
          {"_id": mongoose.Types.ObjectId(postId)},
          {
            "likeCount": 1,
            "likes": {
              "$elemMatch": { "$eq": mongoose.Types.ObjectId(userId) }
            }
          });
          // If they have liked it, remove User's id from the likes array and dec likeCount
          if(post && post[0].likes.length > 0) {
            console.log("Already Liked");
            await Post.update(
              { 
                  "_id": mongoose.Types.ObjectId(postId), 
                  "likes": mongoose.Types.ObjectId(userId)
              },
              {
                  "$inc": { "likeCount": -1 },
                  "$pull": { "likes": mongoose.Types.ObjectId(userId) }
              });
          // Otherwise add the User's id to the likes array and inc likeCount
          } else {
            console.log("Not Liked");
            await Post.update(
              { 
                  "_id": mongoose.Types.ObjectId(postId), 
                  "likes": { "$ne": mongoose.Types.ObjectId(userId) }
              },
              {
                  "$inc": { "likeCount": 1 },
                  "$push": { "likes": mongoose.Types.ObjectId(userId) }
              });
          }
          res.status(200).json();
        } catch(err) {
          return next(err);
        }
      }
    }
]

exports.addComment = [
    // validate params
    body('author', 'Author required').isLength({min: 1}).trim(),
    body('message', 'Message required').isLength({min: 1}).trim(),
    // sanitize
    sanitizeBody('*').escape(),

    async (req, res, next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        res.status(422).json({errors: errors.array(), post: newPost});
        return;
      }
      else {
        try {
          let post = await Post.findById(req.params.id)
          if (!post) {
            return res.status(404).json();
          }
          post.comments.push({author: req.body.author, message: req.body.message});       
            
          await post.save();
          return res.status(201).json();
        } catch(err) {
          return next(err);
        }
      }
    }
]

// Array of middleware
exports.createPost = [
  // validate params
  body('author', 'Author required').isLength({min: 1}).trim(),
  body('message', 'Message required').isLength({min: 1}).trim(),
  // sanitize
  sanitizeBody('*').escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    const newPost = new Post({
      author: req.body.author,
      message: req.body.message,
      comments: [],
    });
    if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array(), post: newPost});
    }
    else {
      newPost.save((err) => {
        if(err) return next(err);
      });
      return res.status(201).json({post: newPost});
    }
  }
]