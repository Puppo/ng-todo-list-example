
function tackDate(req, res, next) {
  if (['POST'].filter(x => x.toUpperCase() === req.method.toUpperCase()).length > 0) {
    req.body.createdAt = Date.now();
  }
  console.log(req.body);
  if (['POST', 'PUT', 'PATCH'].filter(x => x.toUpperCase() === req.method.toUpperCase()).length > 0) {
    req.body.updateAt = Date.now();
  }

  console.log(req.body);
  next();
}

module.exports = {tackDate};
