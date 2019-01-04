const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8082;
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");

// using webpack-dev-server and middleware in development environment
if (process.env.NODE_ENV !== "production") {
  let webpackDevMiddleware = require("webpack-dev-middleware");
  let webpackHotMiddleware = require("webpack-hot-middleware");
  let webpack = require("webpack");
  let config = require("./webpack.config");
  let compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {}));
  app.use(webpackHotMiddleware(compiler));
}
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "/")));
app.use(cookieParser()); // read cookies (needed for auth)
// log every request to the console
// :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
app.use(morgan("common"));
//required for passport
app.use(
  session({
    secret: "dangtm",
    cookie: { maxAge: 3600000 }
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(path.join(__dirname, "public")));
/**
 * Initial socket
 * */
io.sockets.on("connection", function(socket) {
  // send data to client which listening event "abc"
  io.sockets.connected[socket.id].emit(
    "abc",
    { socket_id: socket.id },
    function(_data) {
      // doing something
    }
  );
  // listening event "xyz"
  socket.on("xzy", function(_data) {
    //doing something
  });
  // listening event "disconnect"
  socket.on("disconnect", function() {
    console.log("Socket.io is disconnect");
  });
});
server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info(
      ">> Server listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  }
});
