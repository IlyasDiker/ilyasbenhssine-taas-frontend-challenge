const { getRepositoriesList } = require('../services/getRepositoriesList.service');
const { searchUserRepositories } = require('../services/searchUserRepositories.service');

exports.getRepository = async (req, res) => {
    let page = req.query.page
    let sort = req.query.sort
    let token = res.locals.token
    getRepositoriesList(token, page, sort)
    .then((data)=>{
        res.send(data);
    }, (err) =>{
        res.send({error: err});
    })
}

exports.searchRepository = async (req, res)=>{
    let query = req.query.q
    let token = res.locals.token
    if(!query){
        res.send({error: "Missing query"});
        return;
    }
    searchUserRepositories(token, query)
    .then((data)=>{
        res.send(data);
    }, (err) =>{
        res.send({error: err});
    })
}