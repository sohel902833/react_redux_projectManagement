const auth = require("json-server-auth");
const jsonServer = require("json-server");
const cors = require("cors");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
global.io = io;

const router = jsonServer.router("db.json");

//response middleware
router.render = (req, res) => {
  res.json(res.locals.data);
};

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
app.db = router.db;
app.use(cors());
app.use(middlewares);

const rules = auth.rewriter({
  users: 640,
});

app.use(rules);
app.use(auth);
app.use(router);

server.listen(port);
