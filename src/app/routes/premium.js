module.exports = app => {
    const controller = require('../controllers/PremiumController');
    var router = require("express").Router();

    router.get('/getAllQuinielasPremium', controller.getAllQuinielasPremium);



    app.use('/api/premium', router);
};