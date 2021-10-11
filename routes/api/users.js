const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
var { mongoose } = require("../../config/db/mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateSearchInput = require("../../validation/searchUser");

//Load User model
const User = require("../../models/User");

// @route   GET request to api/users/
// @desc    get users
// @access  Private

router.get(
  "/getUsers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find()
      .sort({ date: -1 })
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ nouserfound: "No user found" }));
  }
);

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" //default
      });

      console.log(req.body.image);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        team: ""
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    login user / returning jwt token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user be email
  User.findOne({ email }).then(user => {
    //check for users
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched

        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }; //created above jwt payload

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    return current user
// @access  Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route   GET api/users/team
// @desc    return team of user
// @access  Private
router.get(
  "/team",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user.team);
  }
);

// @route   POST api/users/team
// @desc    create team of user
// @access  Private
router.post(
  "/team",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //first checking if the team with this name already exists...if not exists then we will proceed to create that team
    User.find().then(users => {
      users.map(user => {
        if (user.team === req.body.team) {
          res.json("team with this name already exists");
        }
      });
    });
    User.findOne({ _id: req.user._id.toString() })
      .then(user => {
        //user existed now we will update or add team
        User.findOneAndUpdate(
          { _id: req.user._id.toString() },
          { $set: { team: req.body.team } },
          { new: true }
        ).then(user => res.json("Team created"));
      })

      .catch(err => res.status(400).json({ notfound: "user not found " }));
  }
);

//
//
//

//**********************              SENDREQUEST   PART(1)                    ************************************
//
//
//

// @route   POST api/users/search
// @desc    searching user and receiving request
// @access  Private
//(here we are checking if user has already send invitation and the other one has not rejected then we are not inviting )
//or we are checking if user is sending req to his own email

router.post("/search/:userID", (req, res) => {
  //email is of the user to whom  request sent
  //email2, avatrar,email,team is of the user who is sending request
  const { errors, isValid } = validateSearchInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  let show = true;
  let avatarr;
  let emaill;
  let teamm;
  //console.log(avatarr, emaill, teamm);
  User.findOne({ _id: req.params.userID }).then(user => {
    emaill = user.email;
    teamm = user.team;
    avatarr = user.avatar;
    console.log(emaill, req.body.email, teamm, avatarr);

    if (emaill === req.body.email) {
      res.json("cant send req to your own email");
    } else {
      //Find user to whom wanna send req...
      User.findOne({ email: req.body.email })
        .then(user => {
          //found
          user.receiveReq.map(reqq => {
            if (reqq.email === emaill) {
              console.log(reqq.email, emaill);
              show = false;
              res.json("You have already sent the invitation to this user");
            }
          });
          if (show === true) {
            if (teamm.length > 0) {
              const reqq = {
                email: emaill,
                avatar: avatarr,
                team: teamm,
                status: "pending",
                hidden: false
              };
              user.receiveReq.unshift(reqq);

              user.save().then(res.json("found"));
            } else {
              res.json("Can not invite if you dont have team");
            }
          }
        })
        .catch(err => res.json(" Email not Exists"));
    }
  }).catch(err => res.json(" Email not Exists"));
});

//
//
//
//********************************            SENDREQUEST PART(2)      ******************** */
//
//
//

// @route   POST api/users/sendRequest/:userID
// @desc    add sent requests record in sending user's table
// @access  Private
router.post("/sendRequest/:userID", (req, res) => {
  //email is of the user to whom we are sending requests
  const { errors, isValid } = validateSearchInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  let avatarr;
  User.findOne({ email: req.body.email }).then(user => {
    avatarr = user.avatar;
    console.log(avatarr);

    User.findOne({ _id: req.params.userID })
      .then(user => {
        const newReq = {
          email: req.body.email,
          avatar: avatarr,
          status: "pending"
        };
        user.sendReq.unshift(newReq);

        user.save().then(user => res.json("request Sent"));
      })
      .catch(err => res.status(400).json({ notfound: "User not Found" }));
  });
});

//
//
//
//*************************              ACCEPTREQUEST  PART(1)        *************************** */
//.
//
//

// @route   POST api/users/acceptRequest/:userID
// @desc    update status of req received(accept request)
// @access  Private

//(first we are checking if there are any approved requests before than we will delete them )..(and then
//we will get the email whose invitation we are gonna accept and will accept and will set the team where we are invited in accepted invite.)
router.post("/acceptRequest/:userID", (req, res) => {
  //(email) is of the user whose request we are accepting here
  //Find user
  User.findOne({ _id: req.params.userID })
    .then(user => {
      console.log(req.body.team);
      console.log(req.params.userID);
      console.log(user.receiveReq);
      //gettinf the index to delete
      const removeIndex = user.receiveReq
        .map(reqq => reqq.status)
        .indexOf("approved");
      //deleting
      user.receiveReq.splice(removeIndex, 1);
      //now accepting new invitation
      user.receiveReq.map(reqq => {
        if (reqq.email === req.body.email) {
          reqq.status = "approved";
          reqq.hidden = true;
        }
      });
      user.team = req.body.team;
      console.log("team input");
      console.log(user.team);

      user.save().then(user => res.json("request approved"));
    })
    .catch(err => res.status(400).json({ notfound: "User not Found" }));
});

//
//
//
//*************************              ACCEPTREQUEST  PART(2)        *************************** */
//.
//
//

// @route   POST api/users/acceptRequest
// @desc    update status of req received(accept request)
// @access  Private
router.post("/acceptRequest/senderr/:userID", (req, res) => {
  //(email) is of the user whose request we are accepting here
  //(emaill) is of the user who is accepting request

  let emaill;
  //first we are getting the email of user by userID
  User.findOne({ _id: req.params.userID })
    .then(user => {
      console.log("inside for getting email");
      console.log(user);
      console.log(user.email);
      emaill = user.email;

      User.findOne({ email: req.body.email }).then(user => {
        user.sendReq.map(reqq => {
          if (reqq.email === emaill) {
            console.log(emaill);
            console.log("now approving");
            reqq.status = "approved";
          }
        });

        user.save().then(user => res.json("request approved"));
      });
    })
    .catch(err => res.status(400).json("user not found"));
});

//
//
//
//*************************              REJECTREQUEST  PART(1)        *************************** */
//.
//
//

// @route   POST api/users/rejectRequest
// @desc    update status of req received(reject request)
// @access  Private
router.post("/rejectRequest/:userID", (req, res) => {
  //email is of the user whose request is gonna reject
  const { errors, isValid } = validateSearchInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find user
  User.findOne({ _id: req.params.userID })
    .then(user => {
      //first get removeIndex
      const removeIndex = user.receiveReq
        .map(reqq => reqq.email)
        .indexOf(req.body.email);

      //now we will splice it out of the array(will remove it)
      user.receiveReq.splice(removeIndex, 1);

      user.save().then(user => res.json("request rejected"));
    })
    .catch(err => res.status(400).json({ notfound: "User not Found" }));
});

//
//
//
//*************************              REJECTREQUEST  PART(2)        *************************** */
//.
//
//

// @route   POST api/users/rejectRequest
// @desc    update status of the user whose request is rejected (reject request)
// @access  Private
router.post("/rejectRequest/senderr/:userID", (req, res) => {
  //email is of the user whose request is rejected
  //email2 is of the user who  rejected Request
  const { errors, isValid } = validateSearchInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  let emaill;
  User.findOne({ _id: req.params.userID })
    .then(user => {
      emaill = user.email;

      //Find user
      User.findOne({ email: req.body.email }).then(user => {
        user.sendReq.map(reqq => {
          if (reqq.email === emaill) {
            reqq.status = "rejected";
            console.log(reqq.status);
          }
        });

        user.save().then(user => res.json("request rejected"));
      });
    })
    .catch(err => res.status(400).json({ notfound: "User not Found" }));
});

module.exports = router;
