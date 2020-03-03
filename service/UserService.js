
const Core = require("./CoreService");
const Notification = require("./NotificationsService");
const UserRepository = require("../repository/UserRepository");
const File = require("../utilities/file");
const bcrypt = require("bcryptjs");

class UserService {

    repository;
    sms; core; notification; file = new File();
    constructor() {
        this.repository = new UserRepository();
        this.core = new Core();
        this.notification = new Notification();
    }

    async create(req) {

        const userPayload = req.body;
        userPayload.password = bcrypt.hashSync(req.body.password);

        const user = await this.repository.createNew(userPayload);
        user.profile_image = (req.body.profile_image) ? this.file.localUpload(req.body.profile_image, "/images/profile/", req.body.last_name, ".png") : null;
        user.cloud_image = (req.body.profile_image) ? this.file.cloudUpload(req.body.profile_image) : null;
        user.save();

        this.core.Email(user, "New Registration", this.core.html('<p style="color: #000">Hello ' + user.first_name + " " + user.last_name + ", Thank you for registering at fashionCast.<br> Please click the link below to complete registration https://fashioncastapi.herokuapp.com/api/activate/" + user.temporarytoken + "</p>"));

        this.core.activityLog(req, user.id, "Registered");

        this.notification.triggerNotification("notifications", "users", {user, message: {msg: user.last_name + " Just created a new account."}}, req, user.id);

        return user;
    }

    async update(req) {

        const userPayload = req.body;

        const user = await this.repository.updateData(req.params.userId, userPayload);
        user.profile_image = (req.body.profile_image) ? this.file.localUpload(req.body.profile_image, "/images/profile/", req.body.last_name, ".png") : user.profile_image;
        user.cloud_image = (req.body.profile_image) ? this.file.cloudUpload(req.body.profile_image) : user.cloud_image;
        user.save();

        this.core.Email(user, "Profile Updated", this.core.html(`<p style="color: #000">Hello ${user.first_name} ${user.last_name}, \n\r Your profile has been updated successfully. </p>`));

        this.core.activityLog(req, user.id, "Update Profile");

        this.notification.triggerNotification("notifications", "users", {user, message: {msg: user.last_name + " Just created a new account."}}, req, user.id);

        return user;
    }
}

module.exports = UserService;