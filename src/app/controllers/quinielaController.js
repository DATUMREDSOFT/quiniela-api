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

exports.getJuego2 = (req, res) => {
    let response;

    Quiniela.getParticipantes(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else {
            response = { ...response, participante: data };

            Quiniela.getPremios(req, (err, dataPremios) => {
                if (!err) {
                    response = { ...response, premios: dataPremios };
                }
                else {
                    response = { ...response, quiniela: [] };
                }
                Quiniela.getQuiniela(req, (err, dataQuiniela) => {
                    if (!err) {
                        response = { ...response, quiniela: dataQuiniela };
                    }
                    else {
                        response = { ...response, quiniela: [] };
                    }

                       res.send({ state: 'success', data: response, message: '' });
                   
                });
            });
        }
    });


}



