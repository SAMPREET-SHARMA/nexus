import jwt from "jsonwebtoken";
const SECRET = 'KEY';

const authenticationJwt = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader)
    {
        const token = authHeader.split(" ")[1];
        jwt.verify(token,SECRET,(err,user)=>{
            if(err)
            {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else
    {
        res.sendStatus(401);
    }
};
export {authenticationJwt , SECRET}