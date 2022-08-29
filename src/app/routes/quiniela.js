module.exports = app => {
    const controller = require('../controllers/quinielaController');
    var router = require("express").Router();

    router.get('/all', controller.findAll);

    app.use('/api/quinielas', router);
};
