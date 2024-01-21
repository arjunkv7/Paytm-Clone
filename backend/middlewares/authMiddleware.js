const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

function authMiddleWare(req, res, next) {
    let authHeader = req.headers.Authorization;

    if (!authHeader || authHeader.startsWith('Bearer ')) {
        return res.status(400).json({
            msg: "Something went wrong"
        });
    }
    let token = authHeader.split(' ')[1];
    try {
        let userId = jwt.verify(token, JWT_SECRET);
        if (!userId) return res.status(400).json({
            msg: "Something went wrong"
        });

        req.userId = userId;
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: "Something went wrong"
        });
    }
}

module.exports = { authMiddleWare };