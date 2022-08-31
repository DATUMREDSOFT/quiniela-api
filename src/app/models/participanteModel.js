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
    INSERT INTO quinielaParticipante (idQuiniela, idParticipante) values(
        (
            SELECT id from quinielas where codigo=?
           )
        ,?)
    `;
    sql.query(query, [req.body.idQuiniela, req.body.idParticipante], (err, res) => {
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

module.exports = Participante;