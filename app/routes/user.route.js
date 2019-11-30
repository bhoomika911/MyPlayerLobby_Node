module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // add user
    app.post('/user/add', user.addUser);

    // get all user
    app.get('/user/list', user.getAllUsers);

    // login  User
    app.post('/user/login', user.userLogin);
}
