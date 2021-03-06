// Requiring necessary npm packages
let express = require("express");
let session = require("express-session");
// Requiring passport as we've configured it
let passport = require("./config/passport");
let exphbs = require("express-handlebars");

// Setting up port and requiring models for syncing
let PORT = process.env.PORT || 8080;
// Heroki may require a tweak to the port to listen on:
// const PORT = process.env.PORT || process.argv[2] || 8080;
let db = require("./models");

// Creating express app and configuring middleware needed for authentication
let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// socket setup
let http = require("http").createServer(app);
let io = require("socket.io")(http);
app.io = io;

// Requiring our routes
require("./routes/auth-api-routes.js")(app);
require("./routes/game-api-routes.js")(app);
require("./routes/token-api-routes.js")(app);
require("./routes/token_log-api-routes.js")(app);
require("./routes/htmlRoutes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  http.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
