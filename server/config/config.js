exports.getClientId = () =>{
    if(!process.env.CLIENT_ID){
        console.error('ERROR : NO CLIENT_ID FOUND on .env');
    }
    return process.env.CLIENT_ID ?? null
}

exports.getGithubOAuth = () =>{
    if(!process.env.GITHUB_OAUTH){
        console.error('ERROR : NO GITHUB_OAUTH FOUND on .env');
    }
    return process.env.GITHUB_OAUTH ?? null
}

exports.getJwtSecret = () =>{
    if(!process.env.JWT_SECRET){
        console.error('ERROR : NO JWT_SECRET FOUND on .env');
    }
    return process.env.JWT_SECRET ?? null
}