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


exports.getPremiosByIdQuiniela = (req, res) => {
    Juego.getPremiosByIdQuiniela(req, (err, data) => {
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

exports.getPuntosByQuiniela = (req, res) => {
    Juego.getPuntosByQuiniela(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send({ state: 'success', data: data, message: null });
    });
}

exports.getPreguntasByQuinielaParticipante = (req, res) => {
    Juego.getPreguntasByQuinielaParticipante(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send({ state: 'success', data: data, message: null });
    });
}

exports.postResultadoPregunta = (req, res) => {
    Juego.postResultadoPregunta(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send({ state: 'success', data: data, message: null });
    });
}

exports.putResultadoPregunta = (req, res) => {
    Juego.putResultadoPregunta(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send({ state: 'success', data: data, message: null });
    });
}


exports.getQuinielasByParticipante = (req, res) => {
    Juego.getQuinielasByParticipante(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send({ state: 'success', data: data, message: null });
    });
}


exports.postPreRegistro = (req, res) => {
    Juego.postPreRegistro(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send({ state: 'success', data: data, message: null });
    });
}

exports.getPreregistroById = (req, res) => {
    Juego.getPreregistroById(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send({ state: 'success', data: data, message: null });
    });
}

exports.deletePreregistroById = (req, res) => {
    Juego.deletePreregistroById(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send({ state: 'success', data: data, message: null });
    });
}