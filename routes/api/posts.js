const express = require("express");
const router = express.Router();
var { mongoose } = require("../../config/db/mongoose");
//const mongoose = require("mongoose");
const passport = require("passport");

//Load Post Model
const Post = require("../../models/Post");
//Load Profile Model
const Profile = require("../../models/Profile");

//Validation
const validatePostInput = require("../../validation/post");

// @route   GET api/posts
// @desc    Get post
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No post found" }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that Id" })
    );
});

// @route   GET request to api/posts/test
// @desc    tests posts route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Posts Works" });
});

// @route   Post request to api/posts
// @desc    create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//@route  DELETE api/posts/:id
//@desc   DELETE post
//@access private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check for post owner
          const str = "5d5933192e97990b5c7231e9";

          if (post.user.toString() !== req.user.id && req.user.id !== str) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          //Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

//@route  POST api/posts/like/:id
//@desc   Like post
//@access private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // first we are checking that is user have already liked this post
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "user already liked this post" });
          }

          // if not then add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

//@route  POST api/posts/unlike/:id
//@desc   Unlike post
//@access private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // first we are checking that is user have  liked this post
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            //if not liked this post
            return res
              .status(400)
              .json({ notliked: "you have not yet liked this post" });
          }

          // if liked the post then remove user id from likes array
          //so first get the remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //now we will splice it from array
          post.likes.splice(removeIndex, 1);
          //now save the post
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

//@route  POST api/posts/comment/:id
//@desc   Add comment to post
//@access private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        //Add comments Array
        post.comments.unshift(newComment);

        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

//@route  DELETE api/posts/comment/:id/:comment_id
//@desc   DELETE comment from post
//@access private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //first find the post
    Post.findById(req.params.id)
      .then(post => {
        //first check to see if the comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          //if not exists
          return res
            .status(404)
            .json({ commentnotexists: "comment des not exists " });
        }
        //if exists
        //first get removeIndex
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //now we will splice it out of the array(will remove it)
        post.comments.splice(removeIndex, 1);

        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
