const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db/db.json');
const middlewares = jsonServer.defaults();
const {authenticated} = require('./middleware/authenticated');
const {tackDate} = require('./middleware/track-date');


server.use(middlewares);
server.use(authenticated);
server.use(jsonServer.bodyParser);
server.use(tackDate);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running')
});
