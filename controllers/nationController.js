const Nations = require("../models/nation");

class nationController {
  index(req, res, next) {
    Nations.find({})
      .then((nations) => {
        res.render("nations", {
          title: "The list of Nations",
          nations: nations,       
        });
      })
      .catch(next);
  }
  create(req, res, next) {
    const nation = new Nations(req.body);
    nation
      .save()
      .then(() => res.redirect("/nations"))
      .catch((error) => {
        error;
      });
  }
  formEdit(req, res, next) {
    const nationId = req.params.nationId;
    let viewsData = {};
    Nations.findById(nationId)
      .then((nation) => {
        res.render("editNation", {
          title: "The detail of Nations",
          nation: nation,
        });
      })
      .catch(next);
  }
  edit(req, res, next) {
    Nations.updateOne({ _id: req.params.nationId }, req.body)
      .then(() => {
        res.redirect("/nations");
      })
      .catch(next);
  }

  delete(req, res, next) {
    Nations.findByIdAndDelete({ _id: req.params.nationId })
      .then(() => res.redirect("/nations"))
      .catch(next);
  }
}
module.exports = new nationController ();