const { User } = require("../models/models");
const bcrypt = require("bcryptjs");

const userController = {};

// Creating a new user
userController.createUser = (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;

  // Initial check to see if user inputted something into both fields:
  // if(!username || !password) {
  //   return next({
  //     log: 'Missing username or password in userController.createUser',
  //     status: 400,
  //     message: {err: 'An error occurred'},
  //   });
  // }

  User.create({ firstName, lastName, username, password })
    .then((newUser) => {
      res.locals.user = newUser.id; // Persisting document only through its unique id for now.
      return next();
    })
    .catch((err) => {
      return next({
        log: `createUser: ${err}`,
        status: 400,
        message: { err: "error occurred in createUser controller" },
      });
    });
};

// Finding a user
userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  // Could check !username || !password -> conditional, throw error.

  User.findOne({ username })
    .then((user) => {
      // res.locals.dataFound = data;
      console.log(user);

      if (!user) {
        // Trying to send back a boolean to the frontend if the user is not found in DB, while also interruption the middleware chain (i.e. no 'return next()' here). Same logic in line 54 below.
        res.sendStatus(404);
      } else {
        bcrypt.compare(password, user.password).then((result) => {
          console.log("RESULT", result);
          if (!result) {
            // passwords did not match
            res.sendStatus(404);
          } else {
            // passwords match!
            console.log("USERID", user.id);
            res.locals.user = user.id;
            return next();
          }
        });
      }
    })
    .catch((err) => {
      return next({
        log: `verifyUser: ${err}`,
        status: 400,
        message: { err: "error occurred in verifyUser controller" },
      });
    });
};

// Given a cookie corresponding to a user's id in DB, find that user and return their username
userController.findUserByCookie = (req, res, next) => {
  // if res.locals.user is null, set res.locals.username to null and return next
  if (!res.locals.user) {
    res.locals.username === null;
    return next();
  } else {
  // else (if res.locals.user is not null), search the database for the user with an '_id' equal to res.locals.user and return the username
  User.findOne({ "_id": res.locals.user }, 'username')
    .then((user) => {
      res.locals.username = user.username;
      return next();
    })
    .catch((err) => {
      return next({
        log: `findUserByCookie: ${err}`,
        status: 400,
        message: { err: "error occurred in findUserByCookie controller" },
      });
    });
  }
};

module.exports = userController;
