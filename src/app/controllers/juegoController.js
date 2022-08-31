const Juego = require('../models/juegoModel');

exports.getFaseByIdQuiniela = (req, res) => {
    Juego.getFaseByIdQuiniela(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send({ state: 'success', data: data, message: null });
    });
}

exports.getPartidosByIdFase = (req, res) => {
    Juego.getPartidosByIdFase(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send({ state: 'success', data: data, message: null });
    });
}


exports.postResultadoPartido = (req, res) => {
    Juego.postResultadoPartido(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send({ state: 'success', data: data, message: null });
    });
}


exports.putResultadoPartido = (req, res) => {
    Juego.putResultadoPartido(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send({ state: 'success', data: data, message: null });
    });
}