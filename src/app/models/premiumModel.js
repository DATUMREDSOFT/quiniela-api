const sql = require("./dbCommon");

const Premium = function (parm) {
};

Premium.getAllQuinielasPremium = (req, result) => {
    let query = `
    SELECT 
       
        c.nombre,
        q.codigo,
        q.nombre as nombreQuiniela, 
        q.idcompeticion,
        c.nombre,
        c.multimedia, 
        '0' as seleccionado
    FROM 
   quinielas AS q 
    JOIN competicion AS c ON c.id = q.idCompeticion 
    `;
    let params = [

    ];

    sql.query(query, (err, res) => {
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

module.exports = Premium;