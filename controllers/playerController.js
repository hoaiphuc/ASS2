const Players = require("../models/players");

let clubData = [
  { id: "1", name: "Arsenal" },
  { id: "2", name: "Manchester United" },
  { id: "3", name: "Chelsea" },
  { id: "4", name: "Manchester City" },
  { id: "5", name: "PSG" },
  { id: "6", name: "Inter Milan" },
  { id: "7", name: "Real Madrid" },
  { id: "8", name: "Barcelona" },
];

class playerController {
  index(req, res, next) {
    Players.find({})
      .then((players) => {
        res.render("player", {
          title: "The list of Players",
          players: players,
          clubList: clubData,
        });
      })
      .catch(next);
  }
  create(req, res, next) {
    const player = new Players(req.body);
    player
      .save()
      .then(() => res.redirect("/player"))
      .catch((error) => {
        error;
      });
  }
  formEdit(req, res, next) {
    const playerId = req.params.playerId;
    let viewsData = {};
    Players.findById(playerId)
      .then((player) => {
        res.render("editPlayer", {
          title: "The detail of Player",
          player: player,
          clubList: clubData,
        });
      })
      .catch(next);
  }
  edit(req, res, next) {
    Players.updateOne({ _id: req.params.playerId }, req.body)
      .then(() => {
        res.redirect("/player");
      })
      .catch(next);
  }

  delete(req, res, next) {
    Players.findByIdAndDelete({ _id: req.params.playerId })
      .then(() => res.redirect("/player"))
      .catch(next);
  }
}
module.exports = new playerController();
