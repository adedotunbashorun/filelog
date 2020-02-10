
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { config } = require("../config/app");
const UserService = require("../service/UserService");
const UserRepository  = require("../abstract/UserRepository");
class AuthController {
    static auth = new UserService(); static repository = new UserRepository();
    
    static async registerUser(req, res) {
        try {
            const user = await this.auth.create(req);
            const token = jwt.sign({ username: user.username, email: user.email, userId: user.id }, config.app.JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({ success: true, user, token });
        } catch (error) {
            return res.status(401).json({ success: false, error, msg: error.message });
        }

    }

    
    static async activateUser(req, res) {
        try {
            const user = await this.repository.findById(req.params.id);
            user.is_active = true;
            user.save();

            return res.status(200).json({ success: true, user, msg: "user activated successfully" });
        } catch (error) {
            return res.status(401).json({ success: false, error, msg: error.message });
        }

    }

    
    static authenticateUser(req, res, next) {
        passport.authenticate("local", { session: false },  (err, user, info) => {
            // no async/await because passport works only with callback ..
            if (err) { return next({err}); }
            if (!user) {
                return res.status(401).json({ success: false, info, msg: "unauthorized" });
            } else {
                req.logIn(user, { session: false }, (err) => {
                    if (err) { return res.json(err.message); }
                    const token = jwt.sign({ username: user.username, email: user.email, userId: user.id }, config.app.JWT_SECRET, { expiresIn: "1h" });
                    return res.status(200).json({ user, token });
                });
            }
        })(req, res, next);
    }
}

module.exports = AuthController;