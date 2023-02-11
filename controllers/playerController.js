const Players = require('../models/players')
class playerController{
    index(req, res, next){
      Players.find({})
    .then((players) =>{
        res.render('player',{
            title: 'The list of Players',
            players: players
        });
    }).catch(next);
    }
    create(req, res, next){
        const player = new Players(req.body);
        player.save()
        .then(() => res.redirect('/players'))
        .catch(error =>{error});
    }
}
module.exports = new playerController;
