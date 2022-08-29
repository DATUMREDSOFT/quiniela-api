module.exports = app => {
    const controller = require('../controllers/quinielaController');
    var router = require("express").Router();

    router.get('/all', controller.findAll);
    router.get('/juego/:participante/:quiniela', controller.getJuego);


    app.use('/api/quinielas', router);
};
