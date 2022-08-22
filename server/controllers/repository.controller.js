let utils = require('../utils');

exports.getRepository = async (req, res) => {
    let page = req.query.page
    let sort = req.query.sort
    utils.validateJWT(req).then((token) => {
        utils.sendRequest('get', `https://api.github.com/user/repos?page=${page}${sort ? '&sort='+sort : ''}`, null, token)
        .then((data)=>{
            res.send(data);
        }, (err) =>{
            utils.throwErr(res, err);
        })
    }, (err) => {
        utils.throwErr(res, err);
    })
}

exports.searchRepository = async (req, res)=>{
    let query = req.query.q
    utils.validateJWT(req).then((token) => {
        utils.sendRequest('get', `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`, null, token)
        .then((data)=>{
            res.send(data);
        }, (err) =>{
            utils.throwErr(res, err);
        })
    }, (err) => {
        utils.throwErr(res, err);
    })
}