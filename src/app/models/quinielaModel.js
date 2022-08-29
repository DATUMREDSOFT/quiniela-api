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
         c.multimedia AS multimediaCompeticion 
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
         q.codigo = ?
    
    `;


    let params = [
        req.params.participante,
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
                let query2 = "SELECT * FROM partidos where idFase = ?";

                sql.query(query2, [d.id], (err2, res2) => {
                    console.log(res2)
                    fases.push({ ...d, partidos: res2 });
                });

            }

           setTimeout(() => {
            let response = {
                participante: res[0][0],
                quiniela: { ...res[1][0], fases: fases },
            }

            result(null, { state: 'success', data: response, message: null });
           }, 5000);
        }
        else {
            result(null, { state: 'fail', data: res, message: null });
        }

    });
};





module.exports = Quiniela;