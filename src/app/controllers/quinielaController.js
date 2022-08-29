const Quiniela = require('../models/quinielaModel');


exports.findAll = (req, res) => {
    Quiniela.findAll(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send({ state: 'success', data: data, message: null });
    });
}

exports.getJuego = (req, res) => {
    Quiniela.getJuego(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else {
            res.send(data);
        }
    });
}



