module.exports = app => {
    const controller = require('../controllers/participanteController');
    var router = require("express").Router();

    router.post('/login', controller.login);



    app.use('/api/participante', router);
};