const cookieController = {};

// setCookie (playing around)
cookieController.setCookie = (req, res, next) => {
  res.cookie("secret", Math.floor(Math.random() * 100).toString());
  return next();
};

// setSSIDCookie:
cookieController.setSSIDCookie = (req, res, next) => {
  console.log("IN setSSIDCookie CONTROLLER: ");
  res.cookie("ssid", res.locals.user, { httpOnly: true });
  return next();

  // need some error handling here?
};

// getCookie:
cookieController.getCookie = (req, res, next) => {
  // if there is no cookie stored with a key 'ssid', set res.locals.user to null
  if (!req.cookies.ssid) {
    res.locals.user === null;
  } else {
  // else (there is a ssid cookie in the browser), assign its value to res.locals.user
  res.locals.user = req.cookies.ssid;
  }
  return next();
}

module.exports = cookieController;
