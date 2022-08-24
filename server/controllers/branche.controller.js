const { getBranchesList } = require('../services/getBranchesList.service');

exports.getBranches = async (req, res) => {
    let repo = req.query.repo
    let token = res.locals.token
    if(!repo){
        res.send({error: "Missing repo"});
        return;
    }
    getBranchesList(token, repo)
    .then((data)=>{
        res.send(data);
    }, (err) =>{
        res.send({error: err});
    })
}