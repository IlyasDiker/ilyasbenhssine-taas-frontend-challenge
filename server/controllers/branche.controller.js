let utils = require('../utils');

exports.getBranches = async (req, res) => {
    let repo = req.query.repo
    utils.validateJWT(req).then((token) => {
        utils.sendRequest('get', `https://api.github.com/repos/${repo}/branches?per_page=100`, null, token)
        .then((data)=>{
            res.send(data);
        }, (err) =>{
            utils.throwErr(res, err);
        })
    }, (err) => {
        utils.throwErr(res, err);
    })
}