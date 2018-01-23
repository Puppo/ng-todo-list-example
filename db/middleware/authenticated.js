const db = require('../db.json');

function authenticated(req, res, next) {
  if (isAuthorized(req)) {
    next();
  } else {
    res.sendStatus(401);
  }
}

function isAuthorized(req) {
  if (
    req.url.indexOf('auth') !== -1 ||
    req.url.indexOf('__rules') !== -1 ||
    req.url.indexOf('db') !== -1
  ) {
    return true;
  }

  const token = parseInt(req.headers['x-auth']) || null;
  const users = db.auths.filter(x => x.id === token);
  if (users.length !== 1) {
    return false;
  }
  req.user = users[0];
  req.token = token;
  return true;
}

module.exports = { authenticated };
