let utils = require('../api/utils');

exports.getCommit = async (req, res)=>{
    let repo = req.query.repo
    let page = req.query.page
    utils.validateJWT(req).then((token) => {
        getBranchCommitsList(token, repo, page)
        .then((data)=>{
            res.send(data);
        }, (err) =>{
            res.send({error: err});
        })
    }, (err) => {
        res.send({error: err});
    })
}