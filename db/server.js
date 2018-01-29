require('./config/config');
const jsonServer = require('json-server');

const PORT = process.env.PORT || 3000;
const db = process.env.db || './db/db.json';

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const {authenticated} = require('./middleware/authenticated');
const {tackDate} = require('./middleware/track-date');


server.use(middlewares);
server.use(authenticated);
server.use(jsonServer.bodyParser);
server.use(tackDate);
server.use(router);
server.listen(PORT, () => {
  console.log('JSON Server is running')
});
