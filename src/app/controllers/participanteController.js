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