const { getUserProfile } = require('../services/getUserProfile.service');
let utils = require('../api/utils');

exports.getUser = async (req, res) => {
    utils.validateJWT(req).then((token) => {
        getUserProfile(token).then((data)=>{
            res.send(data);
        }, (err)=>{
            res.send(err);
        })
    }, (err) => {
        res.send({error: err});
    })
}