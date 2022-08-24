const { getUserProfile } = require('../services/getUserProfile.service');

exports.getUser = async (req, res) => {
    let token = res.locals.token
    getUserProfile(token).then((data)=>{
        res.send(data);
    }, (err)=>{
        res.send(err);
    })
}