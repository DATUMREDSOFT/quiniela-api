const Participante = require("../models/participanteModel");

exports.login = (req, res) => {
    Participante.login(req, (err, data) => {
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

exports.postParticipantesPremium = (req, res) => {
    Participante.postParticipantesPremium(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else {

          
            data.data.codigo= data.data.nombre.substr(0,2).toUpperCase() +((data.data.id.toString()).padStart(6, 0));

           // console.log(data.data.codigo);
            Participante.putParticipantesPremium(data, (err, data2) => {
                res.send(data);
            });

            
        }
    });
}

exports.postQuinielaParticipante = (req, res) => {
    Participante.postQuinielaParticipante(req, (err, data) => {
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