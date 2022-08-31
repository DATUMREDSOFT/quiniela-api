const sql = require("./dbCommon");

const Juego = function (parm) {
    this.id = parm.id;
    this.nombre = parm.nombre;
    this.competicion = parm.competicion;
    this.estado = parm.estado;
};


Juego.login = (req, result) => {
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
    sql.query(query, [req.body.codigo], (err, res) => {
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
};

Juego.getFaseByIdQuiniela = (req, result) => {
    let query = `
    SELECT 
        f.id, f.nombre, f.modoGrupo, cf.aciertoResultado, cf.aciertoGanador, cf.aciertoPreguntas, cf.fechaMaxRespuesta, cf.idQuiniela
    FROM 
        quinielas AS q JOIN competicion AS c ON c.id=q.idCompeticion
        JOIN fases AS f ON f.idCompeticion=c.id   join configuracionfase as cf on cf.idFase=f.id AND q.id = cf.idQuiniela
    WHERE 
        q.codigo = ?
    `;


    let params = [
        req.params.quiniela
    ];

    sql.query(query, params, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, []);
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


Juego.getPartidosByIdFase = (req, result) => {
    let query = `
    SELECT 
	p.*, 
	(SELECT id FROM quinielas WHERE codigo=?) AS idQuiniela,
	(SELECT part.id FROM participantes AS part WHERE codigo=?) AS idParticipante,
	(SELECT qp1.id FROM quinielaparticipante AS qp1 WHERE qp1.idQuiniela = (SELECT id FROM quinielas WHERE codigo=?)  AND  qp1.idParticipante= (SELECT id FROM participantes WHERE codigo=?)) AS idQuinielaParticipante,
	(SELECT equipo FROM equipos WHERE id=p.idEquipoLocal) AS local,
	(SELECT logo FROM equipos WHERE id=p.idEquipoLocal) AS logoLocal,
	(SELECT equipo FROM equipos WHERE id=p.idEquipoVisitante) AS visita,
	(SELECT logo FROM equipos WHERE id=p.idEquipoVisitante) AS logoVisita,
	(SELECT rp.marcadorCasa FROM resultadospartidos AS rp WHERE rp.idPartido = p.id AND rp.idQuinielaParticipante=(SELECT qp1.id FROM quinielaparticipante AS qp1 WHERE qp1.idQuiniela = (SELECT id FROM quinielas WHERE codigo=?)  AND  qp1.idParticipante= (SELECT id FROM participantes WHERE codigo=?))) AS previstoLocal,
	(SELECT rp.marcadorVisitante FROM resultadospartidos AS rp WHERE rp.idPartido = p.id AND rp.idQuinielaParticipante=(SELECT qp1.id FROM quinielaparticipante AS qp1 WHERE qp1.idQuiniela = (SELECT id FROM quinielas WHERE codigo=?)  AND  qp1.idParticipante= (SELECT id FROM participantes WHERE codigo=?))) AS previstoVisitante,
	(SELECT rp.marcadorCasa FROM resultadospartidos AS rp WHERE rp.idPartido = p.id AND rp.idQuinielaParticipante=(SELECT qp1.id FROM quinielaparticipante AS qp1 WHERE qp1.idQuiniela = (SELECT id FROM quinielas WHERE codigo=?)  AND  qp1.idParticipante= (SELECT id FROM participantes WHERE codigo=?))) AS previstoLocalbk,
	(SELECT rp.marcadorVisitante FROM resultadospartidos AS rp WHERE rp.idPartido = p.id AND rp.idQuinielaParticipante=(SELECT qp1.id FROM quinielaparticipante AS qp1 WHERE qp1.idQuiniela = (SELECT id FROM quinielas WHERE codigo=?)  AND  qp1.idParticipante= (SELECT id FROM participantes WHERE codigo=?))) AS previstoVisitantebk,
	(SELECT rp.id FROM resultadospartidos AS rp WHERE rp.idPartido = p.id AND rp.idQuinielaParticipante=(SELECT qp1.id FROM quinielaparticipante AS qp1 WHERE qp1.idQuiniela = (SELECT id FROM quinielas WHERE codigo=?)  AND  qp1.idParticipante= (SELECT id FROM participantes WHERE codigo=?))) AS idResultado
    FROM 
        partidos AS p 
    WHERE 
        p.idFase=?
    `;


    let params = [
        req.params.quiniela,
        req.params.participante,
        req.params.quiniela,
        req.params.participante,

        req.params.quiniela,
        req.params.participante,
        req.params.quiniela,
        req.params.participante,
        req.params.quiniela,
        req.params.participante,
        req.params.quiniela,
        req.params.participante,
        req.params.quiniela,
        req.params.participante,
        
        req.params.fase
    ];

    sql.query(query, params, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, []);
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


Juego.postResultadoPartido = (req, result) => {
    let query = `
    INSERT INTO quiniela.resultadospartidos (idPartido, idQuinielaParticipante, marcadorCasa, marcadorVisitante, estado) VALUES (?, ?, ?, ?, 'Activo');
    `;


    let params = [
        req.body.id,
        req.body.idQuinielaParticipante,
        req.body.previstoLocal,
        req.body.previstoVisitante
    ];

    sql.query(query, params, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, null);
            return;
        }
       
            result(null, { ...req.body, idResultado: res.insertId });
       
    });
};


Juego.putResultadoPartido = (req, result) => {
    let query = `
    UPDATE quiniela.resultadospartidos SET idPartido=?, idQuinielaParticipante=?, marcadorCasa=?, marcadorVisitante=?, estado= 'Activo' 
    WHERE id=?
    `;


    let params = [
        req.body.id,
        req.body.idQuinielaParticipante,
        req.body.previstoLocal,
        req.body.previstoVisitante,
        req.body.idResultado
    ];

    console.log(params);

    sql.query(query, params, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, null);
            return;
        }
        
            result(null, { ...req.body, res:res});
        
    });
};


module.exports = Juego;