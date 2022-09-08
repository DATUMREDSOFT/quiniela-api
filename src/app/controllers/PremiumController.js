const Premium = require("../models/premiumModel");

exports.getAllQuinielasPremium = (req, res) => {
    Premium.getAllQuinielasPremium(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send({ state: 'success', data: data, message: null });
    });
}