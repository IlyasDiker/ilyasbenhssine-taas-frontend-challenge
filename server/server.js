require('dotenv').config();
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')

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
            
            res.send(data.data);
        }, (err) =>{
            res.send(err.message);
        })
    } else {
        res.send({error: "No code was provided"})
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
  