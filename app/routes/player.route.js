module.exports = (app) => {
    const player = require('../controllers/player.controller.js');

    // get all Players 
    app.get('/player/list', player.findAll);

    // add  Player
    app.post('/player/add', player.createPlayer);

    // update  Player
    app.put('/player/update/:player_id', player.updatePlayer);

    // delete  Player
    app.delete('/player/delete/:player_id', player.deletePlayer);

}
