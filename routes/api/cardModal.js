const express = require("express");
const router = express.Router();
var { mongoose } = require("../../config/db/mongoose");
//const mongoose = require("mongoose");
const passport = require("passport");

//Load Card Model
const Modal = require("../../models/cardModal");
//Validation
const validateCardModalInput = require("../../validation/cardModal");

// @route   GET api/cardModal
// @desc    Get modal
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Modal.find()
      .then(modals => {
        res.json(modals);
      })
      .catch(err =>
        res.status(404).json({ nomodalfound: "No credentials found" })
      );
  }
);

// @route   POST api/cardModal/:cardID/:userID
// @desc    reset/initialize modal for card
// @access  Private
router.post(
  "/:cardID/:userID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Modal.findOne({ card_id: req.params.cardID }).then(modal => {
      //const str ="5d5933192e97990b5c7231e9";
      // if (req.params.userID !== req.user._id.toString()  &&  req.user._id.toString() !== str) {
      //   return res.status(401).json({ notauthorized: "User not authorized" });
      // }

      if (modal) {
        console.log("modal finded");
        res.json(modal);
      } else {
        console.log("creating new");
        const newModel = new Modal({
          user_id: req.user._id,
          card_id: req.params.cardID
        });

        newModel.save().then(modal => {
          res.json(modal);
        });
      }
    });
  }
);

// @route   POST api/cardModal/:cardID/duedate
// @desc    update dueDate
// @access  Private
router.post(
  "/duedate/update/:cardID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("enter");
    Modal.findOne({ card_id: req.params.cardID })
      .then(modal => {
        let chk;
        chk = false;
        const str = "5d5933192e97990b5c7231e9";
        if (
          modal.user_id.toString() !== req.user._id.toString() &&
          req.user._id.toString() !== str
        ) {
          modal.members.map(mmbr => {
            if (req.user.email === mmbr.email) {
              chk = true;
              console.log(chk);
            }
          });
          console.log(chk);
          if (!chk) {
            return res.json("User not authorized");
          }
        }

        //authorized
        Modal.findOneAndUpdate(
          { card_id: req.params.cardID },
          { $set: { dueDate: req.body.dueDate } },
          { new: true }
        ).then(modal =>
          res.json(modal.dueDate)
        );
      })
      .catch(err => res.json({ notfound: "modal not found" }));
  }
);

// @route   POST api/cardModal/:cardID/description
// @desc    create/update description
// @access  Private
router.post(
  "/description/update/:cardID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    Modal.findOne({ card_id: req.params.cardID })
      .then(modal => {
        let chk;
        chk = false;
        const str = "5d5933192e97990b5c7231e9";
        if (
          modal.user_id.toString() !== req.user._id.toString() &&
          req.user._id.toString() !== str
        ) {
          modal.members.map(mmbr => {
            if (req.user.email === mmbr.email) {
              chk = true;
              console.log(chk);
            }
          });
          console.log(chk);
          if (!chk) {
            return res.json("User not authorized");
          }
        }
        //authorized
        Modal.findOneAndUpdate(
          { card_id: req.params.cardID },
          { $set: { description: req.body.description } },
          { new: true }
        ).then(modal => res.json(modal.description));
      })
      .catch(err => res.json({ notfound: "modal not found" }));
  }
);

// @route   POST api/cardModal/checklists/update/:cardID
// @desc    create/update checklists
// @access  Private
router.post(
  "/checklists/update/:cardID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Modal.findOne({ card_id: req.params.cardID })
      .then(modal => {
        console.log("inside then of add checklist");
        let chk;
        chk = false;
        const str = "5d5933192e97990b5c7231e9";
        if (
          modal.user_id.toString() !== req.user._id.toString() &&
          req.user._id.toString() !== str
        ) {
          modal.members.map(mmbr => {
            if (req.user.email === mmbr.email) {
              chk = true;
              console.log(chk);
            }
          });
          console.log(chk);
          if (!chk) {
            return res.json("User not authorized");
          }
        }
        modal.checklist.map(chkk => {
          if (req.body.name === chkk.name) {
            return res.json({ error: "You already have this checklist" });
          }
        })
        //authorized
        const newChecklist = {
          name: req.body.name,
          status: false
        };
        console.log(newChecklist);
        modal.checklist.unshift(newChecklist);


        //save
        modal.save().then(modal => res.json(modal.checklist));
      })
      .catch(err => res.json({ notfound: "modal not found" }));
  }
);

// @route   GET api/cardModal/checklists/update/:cardID
// @desc    get checklists by cardID
// @access  Private
router.get(
  "/checklists/update/:cardID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("inside route of getting checklists for card");
    console.log(req.params.cardID);
    Modal.findOne({ card_id: req.params.cardID })
      .then(modal => {
        if (modal.checklist.length > 0) {
          res.json(modal.checklist);
        }
      })

      .catch(err => res.json({ notfound: "modal not found" }));
  }
);

// @route   DELETE api/cardModal/checklists/update/:cardID
// @desc    delete checklists
// @access  Private
router.delete(
  "/checklists/update/:cardID/:checklistID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Modal.findOne({ card_id: req.params.cardID })
      .then(modal => {
        console.log(req.params.cardID, req.params.checklistID);
        let chk;
        chk = false;
        const str = "5d5933192e97990b5c7231e9";
        if (
          modal.user_id.toString() !== req.user._id.toString() &&
          req.user._id.toString() !== str
        ) {
          modal.members.map(mmbr => {
            if (req.user.email === mmbr.email) {
              chk = true;
              console.log(chk);
            }
          });
          console.log(chk);
          if (!chk) {
            return res.json("User not authorized");
          }
        }
        //first check to see if the checklist exists
        if (
          modal.checklist.filter(
            list => list._id.toString() === req.params.checklistID
          ).length === 0
        ) {
          //if not exists
          return res
            .status(404)
            .json({ notexists: "checklist does not exists " });
        }
        //if exists
        //first get removeIndex
        const removeIndex = modal.checklist
          .map(list => list._id.toString())
          .indexOf(req.params.checklistID);

        //now we will splice it out of the array(will remove it)
        modal.checklist.splice(removeIndex, 1);

        //save
        modal.save().then(modal => res.json(modal.checklist));
      })
      .catch(err => res.json({ notfound: "modal not found" }));
  }
);

// @route   POST api/cardModal/checklists/update/:cardID
// @desc    update checklist's status
// @access  Private
router.post(
  "/checklists/update/:cardID/:checklistID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Modal.findOne({ card_id: req.params.cardID })
      .then(modal => {
        let chk;
        chk = false;
        const str = "5d5933192e97990b5c7231e9";
        if (
          modal.user_id.toString() !== req.user._id.toString() &&
          req.user._id.toString() !== str
        ) {
          modal.members.map(mmbr => {
            if (req.user.email === mmbr.email) {
              chk = true;
              console.log(chk);
            }
          });
          console.log(chk);
          if (!chk) {
            return res.json("User not authorized");
          }
        }

        modal.checklist.map(list => {
          if (list._id.toString() === req.params.checklistID) {
            list.status = req.body.status;
          }
        });
        //save
        modal.save().then(modl => res.json(modl.checklist));
      })
      .catch(err => res.json({ notfound: "modal not found" }));
  }
);

// @route   POST api/cardModal/comments/update/:cardID
// @desc    create/update comments
// @access  Private
router.post(
  "/comments/update/:cardID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Modal.findOne({ card_id: req.params.cardID })
      .then(modal => {

        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user_id: req.user.id
        };
        console.log(newComment);
        modal.comments.unshift(newComment);

        //save
        modal.save().then(modl => res.json(modl.comments));
      })
      .catch(err => res.json({ notfound: "modal not found" }));
  }
);

// @route   GET api/cardModal/comments/update/:cardID
// @desc    get comments by cardID
// @access  Private
router.get(
  "/comments/update/:cardID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("inside route of getting comments for card");
    console.log(req.params.cardID);
    Modal.findOne({ card_id: req.params.cardID })
      .then(modal => {
        console.log(modal.comments);
        res.json(modal.comments);
      })

      .catch(err => res.json({ notfound: "modal not found" }));
  }
);

// @route   DELETE api/cardModal/comments/update/:cardID/:commentID
// @desc    delete comments
// @access  Private
router.delete(
  "/comments/update/:cardID/:commentID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Modal.findOne({ card_id: req.params.cardID })
      .then(modal => {
        //first check to see if the comment exists
        if (
          modal.comments.filter(
            comment => comment._id.toString() === req.params.commentID
          ).length === 0
        ) {
          //if not exists
          return res
            .status(404)
            .json({ notexists: "comment does not exists " });
        }
        //if exists
        modal.comments.map(comment => {
          if (comment._id.toString() === req.params.commentID) {
            const str = "5d5933192e97990b5c7231e9";
            if (
              comment.user_id.toString() !== req.user.id.toString() &&
              req.user._id.toString() !== str
            ) {
              return res.json("User not authorized");
            }
          }
        });

        //first get removeIndex
        const removeIndex = modal.comments
          .map(comment => comment._id.toString())
          .indexOf(req.params.commentID);

        //now we will splice it out of the array(will remove it)
        modal.comments.splice(removeIndex, 1);

        //save
        modal.save().then(modal => res.json(modal.comments));
      })
      .catch(err => res.json({ notfound: "modal not found" }));
  }
);

// @route   POST api/cardModal/members/update/:cardID
// @desc    create/update members
// @access  Private
router.post(
  "/members/update/:cardID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCardModalInput(req.body);

    //check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Modal.findOne({ card_id: req.params.cardID })
      .then(modal => {
        let chk = false;
        const str = "5d5933192e97990b5c7231e9";
        if (
          modal.user_id.toString() !== req.user._id.toString() &&
          req.user._id.toString() !== str
        ) {
          modal.members.map(mmbr => {
            if (req.user.email === mmbr.email) {
              chk = true;
              console.log(chk);
            }
          });
          console.log(chk);
          if (!chk) {
            return res.json("User not authorized");
          }
        }

        let emaill;
        modal.members.map(member => {
          if (member.email === req.body.email) {
            emaill = member.email;
          }
        });
        console.log(emaill);
        if (emaill === req.body.email) {
          res.json({ error: "Member already added" });
        } else {
          //now adding member in card
          const newMember = {
            email: req.body.email,
            card_id: req.params.cardID,
            user_id: req.body.user_id
          };

          modal.members.unshift(newMember);

          //save
          modal.save().then(modl => res.json(modl.members));
        }
      })
      .catch(err => res.json({ notfound: "modal not found" }));
  }
);

// @route   DELETE api/cardModal/members/update/:cardID/:memberID
// @desc    delete members
// @access  Private
router.delete(
  "/members/update/:cardID/:memberID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Modal.findOne({ card_id: req.params.cardID })
      .then(modal => {
        const str = "5d5933192e97990b5c7231e9";
        if (
          modal.user_id.toString() !== req.user._id.toString() &&
          req.user._id.toString() !== str
        ) {
          modal.members.map(mmbr => {
            if (req.user.email === mmbr.email) {
              chk = true;
              console.log(chk);
            }
          });
          console.log(chk);
          if (!chk) {
            return res.json("User not authorized");
          }
        }
        //first check to see if the member exists
        if (
          modal.members.filter(
            member => member._id.toString() === req.params.memberID
          ).length === 0
        ) {
          //if not exists
          return res.status(404).json({ notexists: "member does not exists " });
        }
        //if exists
        //first get removeIndex
        const removeIndex = modal.members
          .map(member => member._id.toString())
          .indexOf(req.params.memberID);

        //now we will splice it out of the array(will remove it)
        modal.members.splice(removeIndex, 1);

        //save
        modal.save().then(modal => res.json(modal.members));
      })
      .catch(err => res.json({ notfound: "modal not found" }));
  }
);

module.exports = router;
