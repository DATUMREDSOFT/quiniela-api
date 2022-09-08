const sql = require("./dbCommon");

const Quiniela = function (parm) {
    this.id = parm.id;
    this.nombre = parm.nombre;
    this.competicion = parm.competicion;
    this.estado = parm.estado;
};

Quiniela.findAll = (req, result) => {
    let query = "SELECT * FROM quinielas";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Quiniela.getJuego = (req, result) => {
    let query = `
    SELECT 
        * 
    FROM 
        participantes AS p
    WHERE 
        p.codigo = ?;
   
    SELECT 
        q.id AS idQuiniela,
         q.nombre AS nombreQuiniela,
         q.codigo AS codigoQuiniela,
         c.id AS idCompeticion,
         c.nombre AS nombreCompeticion,
         c.multimedia AS multimediaCompeticion,      
         (SELECT qp.id  FROM   quinielaparticipante AS qp  JOIN participantes AS p ON p.id=qp.idParticipante WHERE  qp.idQuiniela = q.id and p.codigo='${req.params.participante}') as quinielaParticipante
     FROM 
        quinielas AS q JOIN competicion AS c ON c.id=q.idCompeticion 
     WHERE 
        q.codigo = ?;
    
    SELECT 
        f.*
      FROM 
         quinielas AS q JOIN competicion AS c ON c.id=q.idCompeticion
         JOIN fases AS f ON f.idCompeticion=c.id 
      WHERE 
         q.codigo = ?;
    
    SELECT 
        p.* 
    FROM 
        premios AS p JOIN quinielas AS q ON q.id=p.idQuiniela 
    WHERE 
        q.codigo =   ?
    
    `;


    let params = [
        req.params.participante,
        req.params.quiniela,
        req.params.quiniela,
        req.params.quiniela,

    ];

    sql.query(query, params, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, { state: 'fail', data: err, message: null });
            return;

        }

        if (res.length > 0) {

            let fases = [];

            for (let d of res[2]) {
                let query2 = `
                SELECT p.*, e1.equipo AS local, e1.logo AS logoLocal, e2.equipo AS visita, e2.logo AS logoVisita
                FROM 
                    partidos AS p JOIN equipos AS e1 ON e1.id = p.idEquipoLocal 
                    JOIN equipos e2 ON e2.id=p.idEquipoVisitante where idFase = ? ;

                SELECT p.*, f.id  AS idFase, '' as respuestaActual
                FROM 
                    preguntas AS p JOIN configuracionfase AS cf ON cf.id=p.idConfiguracionFase 
                    JOIN fases AS f ON cf.idFase= f.id		
                WHERE f.id = ${d.id}          
                    `;



                sql.query(query2, [d.id], (err2, res2) => {

                    let preguntas = []

                    for (let r of res2[1]) {
                        let queryRespuestas = `
                        select * from respuestas where idPregunta=?
                        `;

                        sql.query(queryRespuestas, [r.id], (err2r, res2r) => {
                            preguntas.push({ ...r, respuestas: res2r });
                        });
                    }

                    fases.push({ ...d, partidos: res2[0], preguntas: preguntas });

                });



            }
            setTimeout(() => {
                let response = {
                    participante: res[0][0],
                    quiniela: { ...res[1][0], fases: fases },
                    premios: res[3]
                }
                result(null, { state: 'success', data: response, message: null });
            }, 3000);
        }
        else {
            result(null, { state: 'fail', data: res, message: null });
        }

    });
};

Quiniela.getPremiosByIdQuiniela = (req, result) => {
    let query = `
    SELECT 
        * , 
        (SELECT COUNT(*) FROM quinielaparticipante WHERE idParticipante = p.id) AS quinielas,
        (SELECT codigo  FROM  quinielaparticipante  AS qp JOIN quinielas AS q ON q.id=qp.idQuiniela  WHERE idParticipante = p.id   ORDER BY qp.id ASC LIMIT 1) AS principal

    FROM 
        participantes AS p
    WHERE 
        codigo = ?
    `;
    sql.query(query, [req.body.quiniela], (err, res) => {
        if (!err) {
            if (res.length > 0) {
                result(null, { state: 'success', data: res[0], message: null });
            }
            else {
                result(null, { state: 'fail', data: [], message: null });
            }
        }
        else {
            console.log("error: ", err);
            result(null, { state: 'fail', data: err, message: null });
            return;
        }

    });
}


Quiniela.getParticipantes = (req, result) => {
    let query = `
    SELECT 
        *,
        '' as codigo ,
        '' as correo ,
        '' as id 
    FROM 
        participantes AS p
    WHERE 
        p.codigo = ?
    `;


    let params = [
        req.params.participante
    ];

    sql.query(query, params, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, null);
            return;
        }
        if (res.length > 0) {
            result(null, res[0]);
        }
        else {
            result(null, null);
        }

    });
};

Quiniela.getQuiniela = (req, result) => {
    let query = `
        SELECT 
            q.id AS idQuiniela,
            q.nombre AS nombreQuiniela,
            q.codigo AS codigoQuiniela,
            c.id AS idCompeticion,
            c.nombre AS nombreCompeticion,
            c.multimedia AS multimediaCompeticion,      
            (SELECT qp.id  FROM   quinielaparticipante AS qp  JOIN participantes AS p ON p.id=qp.idParticipante WHERE  qp.idQuiniela = q.id and p.codigo='${req.params.participante}') as quinielaParticipante
        FROM 
            quinielas AS q JOIN competicion AS c ON c.id=q.idCompeticion 
        WHERE 
            q.codigo = ?
    `;


    let params = [
        req.params.quiniela
    ];

    sql.query(query, params, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, null);
            return;
        }
        if (res.length > 0) {
            result(null, res[0]);
        }
        else {
            result(null, null);
        }
    });
};

Quiniela.getPremios = (req, result) => {
    let query = `
    SELECT 
        p.* 
    FROM 
        premios AS p JOIN quinielas AS q ON q.id=p.idQuiniela 
    WHERE 
        q.codigo =   ?
    `;

    let params = [
        req.params.quiniela
    ];

    sql.query(query, params, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, null);
            return;
        }
        if (res.length > 0) {
            result(null, res);
        }
        else {
            result(null, null);
        }
    });
};

Quiniela.getFaseByIdQuiniela = (req, result) => {
    let query = `
    SELECT 
        f.*
    FROM 
        quinielas AS q JOIN competicion AS c ON c.id=q.idCompeticion
        JOIN fases AS f ON f.idCompeticion=c.id 
    WHERE 
        q.codigo = ?
    `;


    let params = [
        req.params.quiniela
    ];

    sql.query(query, params, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, null);
            return;
        }
        if (res.length > 0) {
            result(null, res);
        }
        else {
            result(null, null);
        }
    });
};

Quiniela.getPartidosByFases = (idFase, result) => {
    let query = `
    SELECT p.*, e1.equipo AS local, e1.logo AS logoLocal, e2.equipo AS visita, e2.logo AS logoVisita
    FROM 
        partidos AS p JOIN equipos AS e1 ON e1.id = p.idEquipoLocal 
        JOIN equipos e2 ON e2.id=p.idEquipoVisitante where idFase = ${idFase}
    `;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, null);
            return;
        }
        if (res.length > 0) {
            result(null, res);
        }
        else {
            result(null, []);
        }
    });
};


Quiniela.getPreguntasByFases = (idFase, result) => {
    let query = `
    SELECT p.*, f.id  AS idFase, '' as respuestaActual
    FROM 
        preguntas AS p JOIN configuracionfase AS cf ON cf.id=p.idConfiguracionFase 
        JOIN fases AS f ON cf.idFase= f.id		
    WHERE f.id = ${idFase}
    `;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, null);
            return;
        }
        if (res.length > 0) {
            result(null, res);
        }
        else {
            result(null, []);
        }
    });
};



Quiniela.getRespuestasByFases = (idPregunta, result) => {
    let query = `
    select * from respuestas where idPregunta= ${idPregunta}
    `;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, null);
            return;
        }
        if (res.length > 0) {
            result(null, res);
        }
        else {
            result(null, []);
        }
    });
};







module.exports = Quiniela;