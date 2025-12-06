const jwt = require("jsonwebtoken")
const userModel = require("./../model/user.model")

async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies && req.cookies.token;
        if (!token) {
            return res.redirect('/auth/login');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.redirect('/auth/login');
        }
        req.user = user;
        res.locals.user = user;

        next();

    } catch (error) {
        return res.redirect('/auth/login');
    }

}

module.exports = authMiddleware;