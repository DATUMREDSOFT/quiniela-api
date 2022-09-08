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

Juego.getPremiosByIdQuiniela = (req, result) => {
    let query = `
    SELECT 
       p.*
    FROM 
      premios as p
    WHERE 
        p.idQuiniela = (SELECT id FROM quinielas WHERE codigo=?)
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
        CALL registrarResultadoPartido (?, ?, ?, ?);
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
    UPDATE resultadospartidos SET idPartido=?, idQuinielaParticipante=?, marcadorCasa=?, marcadorVisitante=?, estado= 'Activo' 
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

        result(null, { ...req.body, res: res });

    });
};

Juego.getPuntosByQuiniela = (req, result) => {
    let query = `
    SELECT * FROM (
 
 
 
 
 
        SELECT 
           nombre,
           if(
               (
                   SELECT SUM(totalPartidos) FROM puntospartidos AS pp1
                   WHERE 
                   pp1.idQuiniela = qp.idQuiniela
                   AND 
                   pp1.idParticipante = qp.idParticipante
               ) != '', 
               (
                   SELECT SUM(totalPartidos) FROM puntospartidos AS pp1
                   WHERE 
                   pp1.idQuiniela = qp.idQuiniela
                   AND 
                   pp1.idParticipante = qp.idParticipante
               ),
               0	
           )AS puntosPartido,
           if(
               (select sum(puntosPorPreguntas.puntos) from  puntosporpreguntas as puntosPorPreguntas where puntosPorPreguntas.idQuinielaParticipante =qp.id )!='',
               (select sum(puntosPorPreguntas.puntos) from  puntosporpreguntas as puntosPorPreguntas where puntosPorPreguntas.idQuinielaParticipante =qp.id ),
               0
           )as puntosporpreguntas ,
           
           (
           
           
           if(
               (select sum(puntosPorPreguntas.puntos) from  puntosporpreguntas as puntosPorPreguntas where puntosPorPreguntas.idQuinielaParticipante =qp.id )!='',
               (select sum(puntosPorPreguntas.puntos) from  puntosporpreguntas as puntosPorPreguntas where puntosPorPreguntas.idQuinielaParticipante =qp.id ),
               0
           ) +
           if(
               (
                   SELECT SUM(totalPartidos) FROM puntospartidos AS pp1
                   WHERE 
                   pp1.idQuiniela = qp.idQuiniela
                   AND 
                   pp1.idParticipante = qp.idParticipante
               ) != '', 
               (
                   SELECT SUM(totalPartidos) FROM puntospartidos AS pp1
                   WHERE 
                   pp1.idQuiniela = qp.idQuiniela
                   AND 
                   pp1.idParticipante = qp.idParticipante
               ),
               0	
           )       
            ) AS total
           
           FROM 
               quinielaparticipante AS qp right JOIN participantes AS p ON p.id  = qp.idParticipante
           WHERE 
               qp.idQuiniela =(SELECT id FROM quinielas WHERE codigo=?)
               
          ) resultado
          
          ORDER BY total desc
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


Juego.getPreguntasByQuinielaParticipante = (req, result) => {
    let query = `
    SELECT 
    r.*,
    (
        select xrxp.idRespuesta from resultadopreguntas as xrxp 
        where 
        xrxp.idPregunta =r.idPregunta
        and
        xrxp.idQuinielaParticipante = (
            SELECT xxqp1.id
            FROM 
                quinielaparticipante as xxqp1 
            WHERE 
                xxqp1.idQuiniela = (SELECT cxx1.id FROM quinielas AS cxx1 WHERE cxx1.codigo=?)
                and
                xxqp1.idParticipante = (SELECT cxx2.id FROM participantes AS cxx2 WHERE cxx2.codigo=?)
    )
        
        
    ) as respuestaSeleccionada,
    r.id as idbk,
        (
            SELECT pregunta FROM preguntas
            WHERE id=r.idPregunta
        ) AS pregunta,
        (
            SELECT idConfiguracionFase FROM preguntas
            WHERE id=r.idPregunta
        ) AS idConfiguracionFase,
       
        (
            SELECT aciertoPreguntas FROM configuracionfase
            WHERE id=(
                SELECT idConfiguracionFase FROM preguntas
                WHERE id=r.idPregunta
            )
        ) AS puntosPreguntaAcertada,
        (
            SELECT x1cf.idFase FROM configuracionfase as x1cf
            WHERE x1cf.id=(
                SELECT xpr1.idConfiguracionFase FROM preguntas AS xpr1
                WHERE xpr1.id=r.idPregunta
            )
        ) AS idFase,
        (
            SELECT x1cf.fechaMaxRespuesta FROM configuracionfase as x1cf
            WHERE x1cf.id=(
                SELECT xpr1.idConfiguracionFase FROM preguntas AS xpr1
                WHERE xpr1.id=r.idPregunta
            )
        ) AS fechaMaxRespuesta,
        (
            SELECT fs1.nombre FROM fases as fs1 
            WHERE fs1.id = (
                                    SELECT x1cf.idFase FROM configuracionfase as x1cf
                                    WHERE x1cf.id=(
                                                                SELECT xpr1.idConfiguracionFase FROM preguntas AS xpr1
                                                                WHERE xpr1.id=r.idPregunta
                                                        )
                                )
        ) AS nombreFase,
        (
            SELECT 
            rpx22.idRespuesta
            FROM
            resultadopreguntas as rpx22
            WHERE 
           
            rpx22.id =(
                SELECT 
                rpx22.id
                FROM
                resultadopreguntas as rpx22
                WHERE 
                rpx22.idQuinielaParticipante = (
                                                                SELECT xxqp1.id
                                                                FROM 
                                                                    quinielaparticipante as xxqp1 
                                                                WHERE 
                                                                    xxqp1.idQuiniela = (SELECT cxx1.id FROM quinielas AS cxx1 WHERE cxx1.codigo=?)
                                                                    and
                                                                    xxqp1.idParticipante = (SELECT cxx2.id FROM participantes AS cxx2 WHERE cxx2.codigo=?)
                                                        )
                AND 
                rpx22.idRespuesta =r.id
            )
        ) AS idRespuesta,
        
        (
            SELECT 
            rpx22.id
            FROM
            resultadopreguntas as rpx22
            WHERE 
            rpx22.idQuinielaParticipante = (
                                                            SELECT xxqp1.id
                                                            FROM 
                                                                quinielaparticipante as xxqp1 
                                                            WHERE 
                                                                xxqp1.idQuiniela = (SELECT cxx1.id FROM quinielas AS cxx1 WHERE cxx1.codigo=?)
                                                                and
                                                                xxqp1.idParticipante = (SELECT cxx2.id FROM participantes AS cxx2 WHERE cxx2.codigo=?)
                                                    )
            AND 
            rpx22.idRespuesta =r.id
        ) AS resultado,
        (
            SELECT 
            rpx22.id
            FROM
            resultadopreguntas as rpx22 JOIN respuestas AS rxxxp ON rxxxp.id = rpx22.idRespuesta
            WHERE 
            rpx22.idQuinielaParticipante = (
                                                            SELECT xxqp1.id
                                                            FROM 
                                                                quinielaparticipante as xxqp1 
                                                            WHERE 
                                                                xxqp1.idQuiniela = (SELECT cxx1.id FROM quinielas AS cxx1 WHERE cxx1.codigo=?)
                                                                and
                                                                xxqp1.idParticipante = (SELECT cxx2.id FROM participantes AS cxx2 WHERE cxx2.codigo=?)
                                                    )
            AND 
            rxxxp.idPregunta = r.idPregunta
        
        ) AS resultadobk,
        (
            SELECT xxqp1.id
            FROM 
                quinielaparticipante as xxqp1 
            WHERE 
                xxqp1.idQuiniela = (SELECT cxx1.id FROM quinielas AS cxx1 WHERE cxx1.codigo=?)
                and
                xxqp1.idParticipante = (SELECT cxx2.id FROM participantes AS cxx2 WHERE cxx2.codigo=?)
    ) as idQuinielaParticipante
        
    FROM 
    respuestas AS r

    join preguntas as p on p.id =r.idPregunta 
	join configuracionfase as cf on cf.id =p.idConfiguracionFase 
    WHERE 
	cf.idQuiniela = (select id from quinielas as q where q.codigo= ?)
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

Juego.postResultadoPregunta = (req, result) => {
    let query = `
    CALL registrarResultadoPreguntas (?, ?, ?);
    
    `;


    let params = [
        req.body.idPregunta,
        req.body.respuestaSeleccionada,
        req.body.idQuinielaParticipante
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


Juego.postPreRegistro = (req, result) => {
    let query = `
        INSERT INTO preregistro (quinielasAsignadas) VALUES (?)  
    `;


    let params = [
        req.body.quinielasAsignadas
    ];

    sql.query(query, params, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, null);
            return;
        }

        result(null, { ...req.body, id: res.insertId });

    });
};


Juego.putResultadoPregunta = (req, result) => {
    let query = `
    UPDATE resultadopreguntas SET idPregunta=?, idRespuesta=?, idQuinielaParticipante=?, estado= 'Activo' 
    WHERE idPregunta=? and idQuinielaParticipante =?
    `;


    let params = [
        req.body.idPregunta,
        req.body.respuestaSeleccionada,
        req.body.idQuinielaParticipante,
        req.body.idPregunta,
        req.body.idQuinielaParticipante,
    ];

    console.log(params);

    sql.query(query, params, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, null);
            return;
        }

        result(null, { ...req.body, res: res });

    });
};


Juego.getQuinielasByParticipante = (req, result) => {
    let query = `
    SELECT 
        qp.idQuiniela, 
        q.nombre,
        q.codigo,
        q.nombre as nombreQuiniela, 
        q.idcompeticion,
        c.nombre,
        c.multimedia,
        p.nombre AS participante,
        p.codigo AS codigoParticipante
    FROM 
    quinielaparticipante AS qp JOIN quinielas AS q ON q.id =qp.idQuiniela
    JOIN competicion AS c ON c.id = q.idCompeticion 
    JOIN participantes AS p ON p.id=qp.idParticipante
    WHERE 
    qp.idParticipante = (SELECT id FROM participantes WHERE codigo=?)
    `;


    let params = [
        req.params.participante
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



Juego.getPreregistroById = (req, result) => {
    let query = `
    SELECT * from preregistro where id=?
    `;
    let params = [
        req.params.id,
    ];

    sql.query(query, params, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, []);
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

Juego.deletePreregistroById = (req, result) => {
    let query = `
   delete from preregistro where id=?
    `;
    let params = [
        req.params.id,
    ];

    sql.query(query, params, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, []);
            return;
        }
       
            result(null, res);
       
    });
};



module.exports = Juego;