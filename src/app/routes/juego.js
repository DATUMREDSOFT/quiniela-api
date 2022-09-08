module.exports = app => {
    const controller = require('../controllers/juegoController');
    var router = require("express").Router();

    router.get('/getFaseByIdQuiniela/:quiniela', controller.getFaseByIdQuiniela);
    router.get('/getPuntosByQuiniela/:quiniela', controller.getPuntosByQuiniela);
    router.get('/getPartidosByIdFase/:fase/:quiniela/:participante', controller.getPartidosByIdFase);
    router.get('/getQuinielasByParticipante/:participante', controller.getQuinielasByParticipante);
    router.get('/getPremiosByIdQuiniela/:participante/:quiniela', controller.getPremiosByIdQuiniela);
    router.get('/getPreguntasByQuinielaParticipante/:participante/:quiniela', controller.getPreguntasByQuinielaParticipante);
    router.post('/postResultadoPartido', controller.postResultadoPartido);
    router.put('/putResultadoPartido', controller.putResultadoPartido);

    router.post('/postResultadoPregunta', controller.postResultadoPregunta);
    router.post('/postPreRegistro', controller.postPreRegistro);
    router.put('/putResultadoPregunta', controller.putResultadoPregunta);
    router.get('/getPreregistroById/:id', controller.getPreregistroById);
    router.delete('/deletePreregistroById/:id', controller.deletePreregistroById);



    app.use('/api/juego', router);
};