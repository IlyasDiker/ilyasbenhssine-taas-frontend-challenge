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

const authController = require('./controllers/auth.controller');
app.post('/api/auth', authController.auth);

const userController = require('./controllers/user.controller');
app.get('/api/user', userController.getUser);

const repositoryController = require('./controllers/repository.controller');
app.get('/api/repositories', repositoryController.getRepository)
app.get('/api/search', repositoryController.searchRepository)

const brancheController = require('./controllers/branche.controller');
app.get('/api/branches', brancheController.getBranches)

const commitController = require('./controllers/commit.controller');
app.get('/api/commits', commitController.getCommit)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
