const { JWT_SECRET } = require("../config/config");
const jwt = require("jsonwebtoken");

function authMiddleWare(req, res, next) {
    let authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({
            msg: "Something went wrong"
        });
    }
    let token = authHeader.split(' ')[1];
    console.log(token)
    try {
        let decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) return res.status(400).json({
            msg: "Something went wrong"
        });

        req.userId = decoded.userId;
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: "Something went wrong"
        });
    }
}

module.exports = { authMiddleWare };