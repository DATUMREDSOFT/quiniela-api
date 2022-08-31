module.exports = app => {
    const controller = require('../controllers/quinielaController');
    var router = require("express").Router();

    router.get('/all', controller.findAll);
    router.get('/juego2/:participante/:quiniela', controller.getJuego);
    router.get('/juego/:participante/:quiniela', controller.getJuego2);


    app.use('/api/quinielas', router);
};
