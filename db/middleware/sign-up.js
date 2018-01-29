const db = require('../db.json');

function checkSignUp(req, res, next) {
  if (!isSignUp(req)) {
    next();
  } else {
    res.sendStatus(409);
  }
}

function isSignUp(req) {
  if (
    req.url.indexOf('auth') !== -1 &&
    req.method === 'POST'
  ) {
    const {email} = req.body;
    return db.auths.filter(x => x.email === email).length > 0;
  }
  return false;
}

module.exports = { checkSignUp };
