const { getBranchesList } = require('../services/getBranchesList.service');
let utils = require('../api/utils');

exports.getBranches = async (req, res) => {
    let repo = req.query.repo
    utils.validateJWT(req).then((token) => {
        getBranchesList(token, repo)
        .then((data)=>{
            res.send(data);
        }, (err) =>{
            res.send({error: err});
        })
    }, (err) => {
        res.send({error: err});
    })
}