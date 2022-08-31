module.exports = app => {
    const controller = require('../controllers/participanteController');
    var router = require("express").Router();

    router.post('/login', controller.login);
    router.post('/postParticipantesPremium', controller.postParticipantesPremium);
    router.post('/postQuinielaParticipante', controller.postQuinielaParticipante);



    app.use('/api/participante', router);
};