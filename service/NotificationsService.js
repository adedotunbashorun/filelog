const pusher = require("pusher");
const Notification  = require("../models/Notification");
const { config } = require("../config/app");

class NotificationsService {
    pushers;

    constructor() {
        this.pushers = new pusher({
            appId: config.pusher.appId,
            key: config.pusher.key,
            secret: config.pusher.secret,
            cluster: config.pusher.cluster,
        });
    }

    async triggerNotification(notifications = "notifications", type, data, req, userId) {
        await this.pushers.trigger(notifications, type, data, req.headers["x-socket-id"]);
        return await this.saveNotification(notifications = "notifications", type, data, userId);
    }

    async saveNotification(notifications = "notifications", type, data, userId) {

        const notify = await Notification.create({
            userId,
            name: notifications,
            type,
            data: JSON.stringify(data),
        });

        return notify;
    }

}

module.exports = NotificationsService;