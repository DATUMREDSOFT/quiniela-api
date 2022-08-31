module.exports = app => {
    const controller = require('../controllers/juegoController');
    var router = require("express").Router();

    router.get('/getFaseByIdQuiniela/:quiniela', controller.getFaseByIdQuiniela);
    router.get('/getPartidosByIdFase/:fase/:quiniela/:participante', controller.getPartidosByIdFase);
    router.post('/postResultadoPartido', controller.postResultadoPartido);
    router.put('/putResultadoPartido', controller.putResultadoPartido);



    app.use('/api/juego', router);
};