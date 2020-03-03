const AbstractController  = require("./AbstractController");
const UserService = require("../service/UserService");
const UserRepository  = require("../repository/UserRepository");

class UserController extends AbstractController {
    static user = new UserService();
    static repository = new UserRepository();

    static async registerUser(req, res) {
        try {
            const user= await this.user.create(req);

            return res.status(200).json({ success: true, user, msg: "user created successfully!" });
        } catch (error) {
            return res.status(401).json({ success: false, error, msg: error.message });
        }

    }

    static async updateUser(req, res) {
        try {
            const user= await this.user.update(req);

            return res.status(200).json({ success: true, user, msg: "user updated successfully" });
        } catch (error) {
            return res.status(401).json({ success: false, error, msg: error.message });
        }
    }

    static async findUser(req, res) {
        try {
            const user= await this.repository.findById(req.params.userId);

            return res.status(200).json({ success: true, user });

        } catch (error) {
            return res.status(401).json({ success: false, error, msg: error.message });
        }
    }
}

module.exports = UserController;
