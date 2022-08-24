const { getBranchCommitsList } = require('../services/getBranchCommitsList.service');

exports.getCommit = async (req, res)=>{
    let repo = req.query.repo
    let page = req.query.page
    let token = res.locals.token
    if(!repo){
        res.send({error: "Missing repo"});
        return;
    }
    getBranchCommitsList(token, repo, page)
    .then((data)=>{
        res.send(data);
    }, (err) =>{
        res.send({error: err});
    })
}