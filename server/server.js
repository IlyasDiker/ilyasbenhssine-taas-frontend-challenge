require('dotenv').config();
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.options('*', cors())
const port = 3000;


app.get('/', (req, res) => {
    res.send('GithubRepoPreview: use /api/*')
}); 

app.post('/api/auth', async (req, res) => {
    let body = req.body;
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.GITHUB_OAUTH;
    if(body.code){
        await axios({
            method:'post',
            url:'https://github.com/login/oauth/access_token',
            headers: {"Accept": "application/json"},
            data:{
                client_id: client_id,
                client_secret: client_secret,
                code: body.code
            }
        }).then((data)=>{
            if(!data.error){
                let token = jwt.sign(data.data, process.env.JWT_SECRET);
                res.send({
                    token: token
                })
            } else {
                res.send(data.data);
            }
        }, (err) =>{
            throwErr(res, err);
        })
    } else {
        res.send({error: "No code was provided"})
    }
})

app.get('/api/user', async (req, res)=>{
    validateJWT(req).then((token) => {
        axios({
            method:'get',
            url:'https://api.github.com/user',
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.access_token}`
            }
        }).then((data)=>{
            res.send(data.data);
        }, (err) =>{
            throwErr(res, err);
        })
    }, (err) => {
        throwErr(res, err);
    })
})

app.get('/api/repositories', async (req, res)=>{
    let page = req.query.page
    let sort = req.query.sort
    validateJWT(req).then((token) => {
        axios({
            method:'get',
            url:`https://api.github.com/user/repos?page=${page}${sort ? '&sort='+sort : ''}`,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.access_token}`
            }
        }).then((data)=>{
            res.send(data.data);
        }, (err) =>{
            throwErr(res, err);
        })
    }, (err) => {
        throwErr(res, err);
    })
})

app.get('/api/branches', async (req, res)=>{
    let repo = req.query.repo
    validateJWT(req).then((token) => {
        axios({
            method:'get',
            url:`https://api.github.com/repos/${repo}/branches?per_page=100`,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.access_token}`
            }
        }).then((data)=>{
            res.send(data.data);
        }, (err) =>{
            throwErr(res, err);
        })
    }, (err) => {
        throwErr(res, err);
    })
})

app.get('/api/commits', async (req, res)=>{
    let repo = req.query.repo
    let page = req.query.page
    validateJWT(req).then((token) => {
        axios({
            method:'get',
            url:`https://api.github.com/repos/${repo}/commits?page=${page ?? 1}`,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.access_token}`
            }
        }).then((data)=>{
            res.send(data.data);
        }, (err) =>{
            throwErr(res, err);
        })
    }, (err) => {
        throwErr(res, err);
    })
})

app.get('/api/commits', async (req, res)=>{
    let repo = req.query.repo
    let page = req.query.page
    let sha = req.query.sha
    validateJWT(req).then((token) => {
        axios({
            method:'get',
            url:`https://api.github.com/repos/${repo}/commits?page=${page ?? 1}${sha ? '&sha='+sha : ''}`,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token.access_token}`
            }
        }).then((data)=>{
            res.send(data.data);
        }, (err) =>{
            throwErr(res, err);
        })
    }, (err) => {
        throwErr(res, err);
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

validateJWT = (req) =>{
    return new Promise((resolve, reject)=>{
        let authHeader = req.headers['authorization']
        let token = authHeader && authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, token)=>{
            if(err){
                reject(err);
            } else {
                resolve(token);
            }
        })
    })
}

throwErr = (res, err) => {
    res.send({error: err.message});
}