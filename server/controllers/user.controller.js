let utils = require('../utils');

exports.getUser = async (req, res) => {
    utils.validateJWT(req).then((token) => {
        utils.sendRequest('get', 'https://api.github.com/user', null, token)
        .then((data)=>{
            res.send(data);
        }, (err) =>{
            utils.throwErr(res, err);
        })
    }, (err) => {
        utils.throwErr(res, err);
    })
}