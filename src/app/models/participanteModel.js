const sql = require("./dbCommon");

const Participante = function (parm) {
    this.id = parm.id;
    this.nombre = parm.nombre;
    this.multimedia = parm.multimedia;
    this.correo = parm.correo;
    this.codigo = parm.codigo;
    this.estado = parm.estado;
};

Participante.login = (req, result) => {
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

Participante.postParticipantesPremium = (req, result) => {
    let query = `
    INSERT INTO participantes (nombre, correo, codigo, estado) values( 
        
       ? ,?, ' ', 'Activo')
    `;
    sql.query(query, [req.body.nombre, req.body.correo], (err, res) => {
        if (!err) {

            console.log(res);

            result(null, { state: 'success', data: { ...req.body, id: res.insertId }, message: null });

        }
        else {
            console.log("error: ", err);
            result(null, { state: 'fail', data: err, message: null });
            return;
        }

    });
};

Participante.getParticipanteInfo = (req, result) => {
    let query = `
    SELECT * from participantes WHERE codigo=?
    `;
    sql.query(query, [req.params.codigo], (err, res) => {
        console.log(res);
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


Participante.putParticipantesPremium = (codigo, result) => {
    let query = `
      update participantes set codigo=? where id =?
    `;
    sql.query(query, [codigo.data.codigo, codigo.data.id], (err, res) => {
        if (!err) {
            if (res.length > 0) {
                result(null, { state: 'success', data: res, message: null });
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

Participante.postQuinielaParticipante = (req, result) => {
    let query = `
    INSERT INTO quinielaparticipante (idQuiniela, idParticipante) values(
        (
            SELECT id from quinielas where codigo=?
           )
        ,?)
    `;
    sql.query(query, [req.body.idQuiniela, req.body.idParticipante], (err, res) => {
        if (!err) {
            result(null, { state: 'success', data: res, message: null });


        }
        else {
            console.log("error: ", err);
            result(null, { state: 'fail', data: err, message: null });
            return;
        }

    });

};

Participante.getValidQuinielaParticipante = (req, result) => {
    let query = `
    SELECT * FROM quinielaparticipante WHERE idQuiniela = ( SELECT id from quinielas where codigo=? ) and idParticipante= ?
    `;

    sql.query(query, [req.body.idQuiniela, req.body.idParticipante], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, { state: 'fail', data: err, message: null });
            return;
        }
        if (res.length > 0) {
            result(null, { state: 'success', data: res, message: null });
        }
        else {

            result(null, { state: 'success', data: [], message: null });
        }
    });
};

Participante.getCodigoByCorreo = (req, result) => {
    let query = `
    SELECT codigo, id as id FROM participantes WHERE correo =?
    `;


    let params = [
        req.params.correo
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


Participante.validQuinielaParticipante = (req, result) => {
    let query = `
    SELECT codigo FROM participantes WHERE correo =?
    `;


    let params = [
        req.params.correo
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

module.exports = Participante;