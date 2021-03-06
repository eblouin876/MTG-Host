// Requiring our custom middleware for checking if a user is logged in
let isAuthenticated = require("../config/middleware/isAuthenticated");
let db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/lobby");
    }
    res.render("index");
  });

  app.get("/lobby", isAuthenticated, function(req, res) {
    res.render("lobby");
  });

  app.get("/arena/:gameId", isAuthenticated, async function(req, res) {
    let data = await db.games.findOne({ where: { id: req.params.gameId } });
    let game = data.dataValues;
    let players = [];
    // Add current players in the game
    for (let i = 1; i < 5; i++) {
      if (game[`player${i}_id`]) {
        player = game[`player${i}_id`];
        life = game[`life${i}`];
        players.push({
          player_game_id: i,
          player_id: player,
          ["life"]: life,
          tokens: []
        });
      }
    }
    // Add name to  each player
    for (let i = 0; i < players.length; i++) {
      let player = await db.players.findOne({
        where: { id: players[i].player_id }
      });
      players[i].name = player.dataValues.name;
    }
    let tokens = await db.token_logs.findAll({
      where: {
        game_id: req.params.gameId
      },
      include: [db.tokens]
    });

    // Add appropriate tokens to each player
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];
      for (let j = 0; j < players.length; j++) {
        if (players[j].player_id === token.player_id) {
          players[j].tokens.push(token.dataValues.token.dataValues);
          console.log("TOKEN DATA", token.dataValues.token.dataValues);
          console.log(players[j].tokens);
        }
      }
    }

    console.log("LOOK AT ME INSTEAD", {
      players: players,
      game: req.params.gameId
    });
    res.render("arena", {
      players: players,
      game: req.params.gameId
    }); // TODO: Object needs to contain {players:[{id:, name:, life:, tokens:{},}]}
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.post("/arena/join", isAuthenticated, function(req, res) {
    let gameId = req.body.id;
    let player = "";
    let life = "";
    db.games
      .findOne({ where: { id: gameId } })
      .then(data => {
        let game = data.dataValues;
        for (let i = 2; i < 5; i++) {
          if (!game[`player${i}_id`]) {
            player = `player${i}_id`;
            life = `life${i}`;
            return;
          }
        }
        res.redirect("/lobby"); // TODO: Add a screen for when a game is full
      })
      .then(() => {
        db.games
          .update(
            { [player]: req.user.id, [life]: 20 },
            { where: { id: req.body.id } }
          )
          .then(() => {
            // TODO: Add below to all cases where live update is needed (and maybe disconnect listener)
            app.io.sockets.emit("update", req.body.id); // Causes all instances of this game to reload
            res.redirect(`/arena/${gameId}`);
          });
      });
  });

  app.get("*", function(req, res) {
    res.render("404");
  });
};
