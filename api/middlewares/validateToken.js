const {verify} = require('jsonwebtoken');
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization');
        if (token) {
            token = token.slice(7);
            verify(token, process.env.SECRECT_KEY, (err, decoded) => {
                if (err) {
                    res.status(401).json({message: "Invalid token."})
                } else {
                    req.userId = decoded.result.id
                    next();
                }
            })
        } else {
            res.status(401).json({message: "Unauthorized access detected!"})
        }
    },
    getUserData: (req, res, next) => {
        let token = req.get('authorization');
        if (token) {
            token = token.slice(7);
            const decoded = verify(token, process.env.SECRECT_KEY);
            const userId = decoded.result.id;
            if (userId) {
                next();
            }
        } else {
            res.status(401).json({message: "Unauthorized access detected!"})
        }
    }
}
