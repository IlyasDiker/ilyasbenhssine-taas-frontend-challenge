let utils = require('../utils');

exports.getCommit = async (req, res)=>{
    let repo = req.query.repo
    let page = req.query.page
    utils.validateJWT(req).then((token) => {
        utils.sendRequest('get', `https://api.github.com/repos/${repo}/commits?page=${page ?? 1}`, null, token)
        .then((data)=>{
            res.send(data);
        }, (err) =>{
            utils.throwErr(res, err);
        })
    }, (err) => {
        utils.throwErr(res, err);
    })
}