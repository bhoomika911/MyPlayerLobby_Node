module.exports = (app) => {
    const game = require('../controllers/game.controller.js');

    // get all Games 
    app.get('/game/list', game.findAll);

    // add  Game
    app.post('/game/add', game.createGame);

}
