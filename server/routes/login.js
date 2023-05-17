const express = require("express");
const loginRouter = express.Router();

// Requiring all controllers
const userController = require("../controllers/userController");
const sessionController = require("../controllers/sessionController");
const cookieController = require("../controllers/cookieController");

/*
Setting Cookie upon 1st visit to Login Page. Could also set cookie upon 1st visit to landing page. Would just need to understand route diff btwn '/' & '/static' & 'main'.
Need to also include cookie setup at Sign-Up page.
*/
// app.get('/', cookieController.setCookie, (req, res) => {
//   res.status(200);
// })

// COOKIE VERIFICATION REQUEST: /login/auth
loginRouter.get(
  '/auth',
  cookieController.getCookie,
  userController.findUserByCookie,
  (req, res) => {
    if (!res.locals.username) {
      return res.sendStatus(401);
    } else {
    return res.status(200).send(res.locals.username);
    }
  }
)

// LOGIN REQUEST: /login/loginRequest
loginRouter.post(
  "/loginRequest", // CONFIRM ROUTE NAME WITH FRONT-END TEAM!
  userController.verifyUser, // verifies user (checks users DB); if verified, stores the unique Mongo id on res.locals.user
  sessionController.startSession, // creates a session in the DB (sessions collection) with a cookieId property set to res.locals.user - or updates the existing session doc in DB (everything is the same except createdAt is updated)
  cookieController.setSSIDCookie, // creates a cookie whose key is 'ssid' and value is res.locals.user (cookieId in session DB/unique id in users DB) 
  (req, res) => {
    // return res.status(200).json(res.locals.dataFound);
    return res.sendStatus(200);
  }
);

// SIGN-UP REQUEST:
// Creating a new user in database -> i.e. sign-up
loginRouter.post(
  "/signupRequest", // CONFIRM ROUTE NAME WITH FRONT-END TEAM!
  userController.createUser, // creates a user in the DB (users collection) and stores the unique id Mongo creates for the user on res.locals.user
  sessionController.startSession, // creates a session in the DB (sessions collection) with a cookieId property set to res.locals.user
  cookieController.setSSIDCookie, // creates a cookie whose key is 'ssid' and value is res.locals.user (cookieId in session DB/unique id in users DB)
  // NOTE: cookie currently expires on Session
  (req, res) => res.sendStatus(200)
);

module.exports = loginRouter;
