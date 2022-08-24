const jwt = require('jsonwebtoken')

exports.validateJWT = (req, res, next) => {
    let authHeader = req.headers['authorization']
    if(!authHeader){
        res.status(401).send({error: "No token specified"});
    }
    let token = authHeader && authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, token)=>{
        if(err){
            res.status(401).send({error: err});
        } else {
            res.locals.token = token
            next();
        }
    })
}
