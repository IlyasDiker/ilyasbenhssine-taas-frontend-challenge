const { getRepositoryInformation } = require('../services/getRepositoryInformation.service');
const { searchUserRepositories } = require('../services/searchUserRepositories.service');
let utils = require('../api/utils');

exports.getRepository = async (req, res) => {
    let page = req.query.page
    let sort = req.query.sort
    utils.validateJWT(req).then((token) => {
        getRepositoryInformation(token, page, sort)
        .then((data)=>{
            res.send(data);
        }, (err) =>{
            res.send({error: err});
        })
    }, (err) => {
        res.send({error: err});
    })
}

exports.searchRepository = async (req, res)=>{
    let query = req.query.q
    utils.validateJWT(req).then((token) => {
        searchUserRepositories(token, query)
        .then((data)=>{
            res.send(data);
        }, (err) =>{
            res.send({error: err});
        })
    }, (err) => {
        res.send({error: err});
    })
}