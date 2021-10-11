const express = require("express");
const router = express.Router();
var { mongoose } = require("../../config/db/mongoose");
//const mongoose = require("mongoose");
const passport = require("passport");

//Load Board Model
const Board = require("../../models/Board");
//Load User model
const User = require("../../models/User");

//Validation
const validateBoardInput = require("../../validation/board");
//Validation
const validateListInput = require("../../validation/list");
//Validation
const validateCardInput = require("../../validation/card");

// @route   GET api/boards
// @desc    Get boards
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Board.find()
      .sort({ date: 1 })
      .then(boards => res.json(boards))
      .catch(err => res.status(404).json({ noboardfound: "No board found" }));
  }
);

// @route   GET api/boards/:id
// @desc    Get board by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Board.findById(req.params.id)
      .then(board => res.json(board))
      .catch(err =>
        res.status(404).json({ noboardfound: "No board found with that Id" })
      );
  }
);

//creating a new board
// @route   POST api/boards
// @desc    ADD board
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBoardInput(req.body);

    //check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const newBoard = new Board({
      title: req.body.title,
      user_id: req.user._id
    });
    newBoard.save().then(board => res.json(board));
  }
);

// @route   POST api/boards/description/:id
// @desc    create/update description
// @access  Private
router.post(
  "/description/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    Board.findById(req.params.id)
      .then(board => {
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.json("You are not authorized");
        }

        //authorized
        Board.findOneAndUpdate(
          { _id: req.params.id },
          { $set: { description: req.body.description } },
          { new: true }
        ).then(board => res.json("Successfully updated"));
      })
      .catch(err => res.json("board not found"));
  }
);

// @route   POST api/boards/title/:id
// @desc    create/update title
// @access  Private
router.post(
  "/title/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    Board.findById(req.params.id)
      .then(board => {
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.json("You are not authorized");
        }

        //authorized
        Board.findOneAndUpdate(
          { _id: req.params.id },
          { $set: { title: req.body.title } },
          { new: true }
        ).then(board => res.json("Successfully updated"));
      })
      .catch(err => res.json("board not found"));
  }
);


//@route  DELETE api/boards/:id
//@desc   DELETE board
//@access private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Board.findById(req.params.id)
      .then(board => {
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.json("You are not authorized");
        }

        //Delete
        board.remove().then(() => res.json("Board is successfully deleted"));
      })
      .catch(err => res.json("Board not found"));
  }
);






//@route  POST api/boards/members/:id
//@desc   Alloting members to board through search
//@access private
router.post(
  "/members/search/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Board.findById(req.params.id)
      .then(board => {
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.json("You are not authorized");
        }

        //we will get required info from users info to add in board member
        User.findOne({ email: req.body.email })
          .then(user => {
            //first we are checking if the member is already added
            let idd;
            board.members.map(member => {
              if (member.userID === user._id.toString()) {
                idd = member.userID;
              }
            });
            console.log(idd);
            if (idd === user._id.toString()) {
              res.json("Member already added");
            } else {
              //now adding members in board
              const newMember = {
                userID: user._id,
                avatar: user.avatar,
                name: user.name
              };
              board.members.unshift(newMember);
              //here we are creating notification 
              const newNoti = {
                boardName: board.title,
                userName: req.body.userr
              }

              user.notification.unshift(newNoti);
              user.save();
              //save
              board
                .save()
                .then(() => res.json("Member is successfully added to board"));

            }
          }).catch(err => res.json('User not found'));

      })
      .catch(err => res.json("Board not found"));
  }
);






//@route  POST api/boards/members/:id
//@desc   Alloting members to board directly on click through team section
//@access private
router.post(
  "/members/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Board.findById(req.params.id)
      .then(board => {
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.json("You are not authorized");
        }

        //first we are checking if the member is already added
        let idd;
        board.members.map(member => {
          if (member.userID === req.body.userID) {
            idd = member.userID;
          }
        });
        console.log(idd);
        if (idd === req.body.userID) {
          res.json("Member already added");
        } else {
          //now adding members in board
          const newMember = {
            userID: req.body.userID,
            avatar: req.body.avatar,
            name: req.body.name
          };
          board.members.unshift(newMember);
          //save
          board
            .save()
            .then(() => res.json("Member is successfully added to board"));
        }
      })
      .catch(err => res.json("Board not found"));
  }
);

//@route  DELETE api/boards/members/:id
//@desc   removing members from board
//@access private
router.delete(
  "/members/:id/:memberID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Board.findById(req.params.id)
      .then(board => {
        console.log('inside delete member');
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.json("You are not authorized");
        }

        //first we are checking if the member exists

        if (
          board.members.filter(
            member => member.userID.toString() === req.params.memberID
          ).length === 0
        ) {
          //if not exists
          console.log('not exists');
          return res
            .status(404)
            .json("member des not exists ");
        }

        //if exists
        //first get removeIndex
        const removeIndex = board.members
          .map(member => member.userID.toString())
          .indexOf(req.params.memberID);

        //now we will splice it out of the array(will remove it)
        board.members.splice(removeIndex, 1);

        //save
        board.save().then(() => res.json("Member is removed from board"));
      })
      .catch(err => res.json("Board not found"));
  }
);

//..............................Listss.....................................................................

// @route   GET api/boards/:boardID/lists
// @desc    Get lists
// @access  Private
router.get(
  "/:boardID/lists",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Board.findById(req.params.boardID)
      .then(board => {
        res.json(board.lists);
      })
      .catch(err => res.status(404).json({ nolistfound: "No list found" }));
  }
);

// @route   POST api/boards/:boardID/lists
// @desc    ADD list
// @access  Private
router.post(
  "/:boardID/lists",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateListInput(req.body);

    //check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Board.findById(req.params.boardID)
      .then(board => {
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        const newList = {
          title: req.body.title,
          user_id: req.user._id
        };
        //Add lists Array
        board.lists.unshift(newList);

        //save
        board.save().then(board => {
          res.json(board.lists);
        });
      })
      .catch(err => res.status(404).json({ boardnotfound: "No board found" }));
  }
);

//@route  DELETE api/boards/:boardID/lists/:id
//@desc   DELETE list
//@access private
router.delete(
  "/:boardID/lists/:listID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //first find the board
    Board.findById(req.params.boardID)
      .then(board => {
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        //first check to see if the list exists
        if (
          board.lists.filter(list => list._id.toString() === req.params.listID)
            .length === 0
        ) {
          //if not exists
          return res
            .status(404)
            .json({ listnotexists: "list des not exists " });
        }
        //if exists
        //first get removeIndex
        const removeIndex = board.lists
          .map(list => list._id.toString())
          .indexOf(req.params.listID);

        //now we will splice it out of the array(will remove it)
        board.lists.splice(removeIndex, 1);

        //save
        board.save().then(board => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ boardnotfound: "No board found" }));
  }
);

//@route  EDIT api/boards/:boardID/lists/:listID
//@desc   EDIT list
//@access private
router.post(
  "/:boardID/lists/:listID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //first find the board
    Board.findById(req.params.boardID)
      .then(board => {
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        //first check to see if the list exists
        if (
          board.lists.filter(list => list._id.toString() === req.params.listID)
            .length === 0
        ) {
          //if not exists
          return res
            .status(404)
            .json({ listnotexists: "list des not exists " });
        }

        //if exists
        board.lists.map(list => {
          if (list._id.toString() === req.params.listID) {
            list.title = req.body.title;
          }
        });
        board.save().then(board => res.json(board));
      })
      .catch(err => res.status(404).json({ boardnotfound: "No board found" }));
  }
);

//@desc   DRAG lists
//@access private
router.delete(
  "/:boardID/lists/draggss/:droppableIndexStart/:droppableIndexEnd",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(
      "inside router of drag lists and displaying params values sequence, index1 index2, id 1,id2, boardID"
    );
    console.log(req.params.droppableIndexStart);
    console.log(req.params.droppableIndexEnd);
    console.log(req.params.boardID);
    //first find the board
    Board.findById(req.params.boardID)
      .then(board => {
        console.log("inside board");
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        //now we will splice dragged list out of the array(will remove it)for pasting it in new index
        const liist = board.lists.splice(req.params.droppableIndexStart, 1);
        console.log("displaying liist");
        console.log(liist);
        //now we are pasting it in new index
        board.lists.splice(req.params.droppableIndexEnd, 0, ...liist);
        //save
        board.save().then(board => res.json(board.lists));
      })
      .catch(err => res.status(404).json({ boardnotfound: "No board found" }));
  }
);

//@route  POST api/boards/:boardID/lists/:listID/members
//@desc   Alloting members to list
//@access private
router.post(
  "/:boardID/lists/:listID/members",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Board.findById(req.params.id)
      .then(board => {
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        //getting list
        board.lists.map(list => {
          if (list._id.toString() === req.params.listID) {
            //first we are checking if the member is already added
            let emaill;
            list.members.map(member => {
              if (member.email === req.body.email) {
                emaill = member.email;
              }
            });
            console.log(emaill);
            if (emaill === req.body.email) {
              res.json("Member already added");
            } else {
              //now adding member in list
              const newMember = {
                email: req.body.email,
                avatar: req.body.avatar
              };
              list.members.unshift(newMember);
            }
          }
        });

        //save
        board
          .save()
          .then(() => res.json("Member is successfully added to list"));
      })
      .catch(err => res.status(404).json({ boardnotfound: "Board not found" }));
  }
);

//@route  DELETE api/boards/:boardID/lists/:listID/members/:memberID
//@desc   removing members from list
//@access private
router.delete(
  "/:boardID/lists/:listID/members/:memberID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Board.findById(req.params.id)
      .then(board => {
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        //getting list
        board.lists.map(list => {
          if (list._id.toString() === req.params.listID) {
            //first we are checking if the member exists

            if (
              list.members.filter(
                member => member._id.toString() === req.params.memberID
              ).length === 0
            ) {
              //if not exists
              return res
                .status(404)
                .json({ membernotexists: "member des not exists " });
            }

            //if exists
            //first get removeIndex
            const removeIndex = list.members
              .map(member => member._id.toString())
              .indexOf(req.params.memberID);

            //now we will splice it out of the array(will remove it)
            list.members.splice(removeIndex, 1);
          }
        });
        //save
        board
          .save()
          .then(() => res.json("Member is removed from list"));
      })
      .catch(err => res.status(404).json({ boardnotfound: "Board not found" }));
  }
);

//..........................................CARDSSS..........................................................

// @route   GET api/boards/boardID/lists/listID/cards
// @desc    Get cards
// @access  Private

router.get(
  "/:boardID/lists/:listID/cards",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //first find the board
    Board.findById(req.params.boardID)
      .sort({ date: -1 })
      .then(board => {
        //first check to see if the list exists
        if (
          board.lists.filter(list => list._id.toString() === req.params.listID)
            .length === 0
        ) {
          // not exists
          return res
            .status(404)
            .json({ listnotexists: "list does not exists " });
        }
        board.lists.map(list => {
          if (list._id.toString() === req.params.listID) {
            //list exists
            res.json(list.cards);
          }
        });
      })
      .catch(err => res.status(404).json({ boardnotfound: "No board found" }));
  }
);

// @route   POST api/boards/:boardID/lists/:listID/cards
// @desc    ADD card
// @access  Private

router.post(
  "/:boardID/lists/:listID/cards",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCardInput(req.body);

    //check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    //first find the board
    Board.findById(req.params.boardID)
      .then(board => {
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          console.log("user not authorized");
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        //first check to see if the list exists
        if (
          board.lists.filter(list => list._id.toString() === req.params.listID)
            .length === 0
        ) {
          // not exists
          return res
            .status(404)
            .json({ listnotexists: "list des not exists " });
        }

        //list exists
        board.lists.map(list => {
          if (list._id.toString() === req.params.listID) {
            //we have found the required list to add card
            const newCard = {
              text: req.body.text,
              user_id: req.user._id
            };
            //add the new card in list
            list.cards.unshift(newCard);
            //save
            board.save().then(board => res.json(board.lists));
          }
        });
      })
      .catch(err => res.status(404).json({ boardnotfound: "No board found" }));
  }
);

//@route  DELETE api/boards/:boardID/lists/:listID/cards/:cardID
//@desc   DELETE card
//@access private
router.delete(
  "/:boardID/lists/:listID/cards/:cardID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //first find the board
    Board.findById(req.params.boardID)
      .then(board => {
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        //first check to see if the list exists
        if (
          board.lists.filter(list => list._id.toString() === req.params.listID)
            .length === 0
        ) {
          // not exists
          return res
            .status(404)
            .json({ listnotexists: "list des not exists " });
        }

        //list exists
        board.lists.map(list => {
          if (list._id.toString() === req.params.listID) {
            //we have found the required list to delete card
            //now we will check if the card exists
            if (
              list.cards.filter(
                card => card._id.toString() === req.params.cardID
              ).length === 0
            ) {
              // card not exists
              return res
                .status(404)
                .json({ cardnotexists: "card does not exists " });
            }

            //if exists
            //first get removeIndex
            const removeIndex = list.cards
              .map(card => card._id.toString())
              .indexOf(req.params.cardID);

            //now we will splice it out of the array(will remove it)
            list.cards.splice(removeIndex, 1);

            //save
            board.save().then(board => res.json(board.lists));
          }
        });
      })
      .catch(err => res.status(404).json({ boardnotfound: "No board found" }));
  }
);

//@route  Edit api/boards/:boardID/lists/:listID/cards/:cardID
//@desc   Edit card
//@access private
router.post(
  "/:boardID/lists/:listID/cards/:cardID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCardInput(req.body);

    //check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    //first find the board
    Board.findById(req.params.boardID)
      .then(board => {
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        //first check to see if the list exists
        if (
          board.lists.filter(list => list._id.toString() === req.params.listID)
            .length === 0
        ) {
          // not exists
          return res
            .status(404)
            .json({ listnotexists: "list des not exists " });
        }

        //list exists
        board.lists.map(list => {
          if (list._id.toString() === req.params.listID) {
            //we have found the required list to delete card
            //now we will check if the card exists
            if (
              list.cards.filter(
                card => card._id.toString() === req.params.cardID
              ).length === 0
            ) {
              // card not exists
              return res
                .status(404)
                .json({ cardnotexists: "card does not exists " });
            }

            //if exists

            list.cards.map(card => {
              if (card._id.toString() === req.params.cardID) {
                card.text = req.body.text;
              }
            });
            //save
            board.save().then(board => res.json(board.lists));
          }
        });
      })
      .catch(err => res.status(404).json({ boardnotfound: "No board found" }));
  }
);

//@route  Edit api/boards/:boardID/lists/:listID/cards/:cardID/lastDate
//@desc   Edit card's lastDate
//@access private
router.post(
  "/:boardID/lists/:listID/cards/:cardID/lastDate",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCardInput(req.body);

    //check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    //first find the board
    Board.findById(req.params.boardID)
      .then(board => {
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        //first check to see if the list exists
        if (
          board.lists.filter(list => list._id.toString() === req.params.listID)
            .length === 0
        ) {
          // not exists
          return res
            .status(404)
            .json({ listnotexists: "list des not exists " });
        }

        //list exists
        board.lists.map(list => {
          if (list._id.toString() === req.params.listID) {
            //we have found the required list to delete card
            //now we will check if the card exists
            if (
              list.cards.filter(
                card => card._id.toString() === req.params.cardID
              ).length === 0
            ) {
              // card not exists
              return res
                .status(404)
                .json({ cardnotexists: "card does not exists " });
            }

            //if exists
            let last = new date();
            list.cards.map(card => {
              if (card._id.toString() === req.params.cardID) {
                card.lastDate = req.body.lastDate;
              }
              if (card._id.toString() === req.params.cardID) {
                last = card.lastDate;
                console.log(last);
              }
            });
            //save
            board.save().then(board => res.json(last));
          }
        });
      })
      .catch(err => res.status(404).json({ boardnotfound: "No board found" }));
  }
);

//@route  Edit api/boards/:boardID/lists/:listID/cards/:cardID
//@desc   Drag cards in same list and different lists
//@access private
router.delete(
  "/:boardID/lists/:droppableIdStart/listss/:droppableIdEnd/cardss/:droppableIndexStart/:droppableIndexEnd",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //first find the board
    console.log(
      "inside router of drag and displaying params values sequence, index1 index2, id 1,id2, boardID"
    );
    console.log(req.params.droppableIndexStart);
    console.log(req.params.droppableIndexEnd);
    console.log(req.params.droppableIdStart);
    console.log(req.params.droppableIdEnd);
    console.log(req.params.boardID);
    Board.findById(req.params.boardID)
      .then(board => {
        console.log("inside board");
        //check for board owner
        const str = "5d5cf44598ac050e18168bca";
        if (board.user_id.toString() !== req.user.id && req.user.id !== str) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        //first check to see if the list exists

        if (req.params.droppableIdStart === req.params.droppableIdEnd) {
          console.log("inside same lists loop in router");
          board.lists.map(list => {
            if (list._id.toString() === req.params.droppableIdStart) {
              //we have found the required list to delete card
              console.log("now we are inside the list");
              const card = list.cards.splice(req.params.droppableIndexStart, 1);
              console.log("now displaying card");
              console.log(card);
              list.cards.splice(req.params.droppableIndexEnd, 0, ...card);

              //save
              board.save().then(board => res.json(board.lists));
            }
          });
        } else {
          const carrdd = [];
          console.log("inside different lists loopp in route");
          board.lists.map(list => {
            if (list._id.toString() === req.params.droppableIdStart) {
              console.log("so the list is found where drag started");
              const cardd = list.cards.splice(
                req.params.droppableIndexStart,
                1
              );
              console.log("displaying cardd");
              console.log(cardd);
              carrdd.push(cardd);
            }
          });
          board.lists.map(list => {
            if (list._id.toString() === req.params.droppableIdEnd) {
              console.log(
                "so the list is found where drag finished and again displaying cardd"
              );
              console.log(carrdd[0]);
              list.cards.splice(req.params.droppableIndexEnd, 0, ...carrdd[0]);
              board
                .save()
                .then(board => res.json(board.lists))
                .catch(err => res.json({ draggingfailed: "cant save" }));
            }
          });
        }
      })
      .catch(err => res.status(404).json({ boardnotfound: "No board found" }));
  }
);



















module.exports = router;
