const Quiniela = require('../models/quinielaModel');
const quiniela = require('../routes/quiniela');


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
                    Quiniela.getFaseByIdQuiniela(req, (err, dataFases) => {
                        if (!err) {
                            response.quiniela = { ...response.quiniela, fases: dataFases };
                        }
                        else {
                            response.quiniela = { ...response.quiniela, fases: [] };
                        }

                        if (dataFases.length > 0) {

                            let contador = 0;
                            for (let f of dataFases) {
                                Quiniela.getPartidosByFases(f.id, (err, dataPartidos) => {
                                    response.quiniela.fases[contador] = { ...response.quiniela.fases[contador], partidos: dataPartidos }
                                    contador++;
                                    if (contador == dataFases.length) {

                                        res.send({ state: 'success', data: response, message: '' });
                                        let contador2 = 0;
                                       /*  for (let f2 of dataFases) {
                                            Quiniela.getPreguntasByFases(f2.id, (err, dataPreguntas) => {
                                                response.quiniela.fases[contador2] = { ...response.quiniela.fases[contador2], preguntas: dataPreguntas }
                                                contador2++;
                                                if (contador2 == dataFases.length) {
                                                    console.log('contador2',contador2 == dataFases.length)
                                                    let contador3 = 0;
                                                    console.log(dataPreguntas)
                                                    for (let p of dataPreguntas) {
                                                        Quiniela.getRespuestasByFases(p.id, (err, dataRespuesta) => {
                                                            response.quiniela.fases[contador2].preguntas[contador3] = { respuestas: dataRespuesta, ...response.quiniela.fases[contador2].preguntas };
                                                            contador3++;
                                                            console.log(dataPreguntas.length == contador3);
                                                            if (dataPreguntas.length == contador3) {
                                                                
                                                            }
                                                        });

                                                    }
                                                }
                                            });
                                        } */


                                    }
                                });


                            }
                        }


                    });
                });
            });
        }
    });


}



