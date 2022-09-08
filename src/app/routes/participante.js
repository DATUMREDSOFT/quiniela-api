module.exports = app => {
    const controller = require('../controllers/participanteController');
    var router = require("express").Router();

    router.post('/login', controller.login);
    router.post('/postParticipantesPremium', controller.postParticipantesPremium);
    router.post('/getValidQuinielaParticipante', controller.getValidQuinielaParticipante);
    router.post('/postQuinielaParticipante', controller.postQuinielaParticipante);
    router.get('/getCodigoByCorreo/:correo', controller.getCodigoByCorreo);
    router.get('/getParticipanteInfo/:codigo', controller.getParticipanteInfo);



    app.use('/api/participante', router);
};