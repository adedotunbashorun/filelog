const ActivityLog = require("../models/ActivityLog");

const nodemailer = require("nodemailer");
const { config } = require("../config/app");

class CoreService {
    client;

    constructor() {
        this.client = nodemailer.createTransport({
            service: "SendGrid",
            auth: {
              user: config.mail.auth.api_user,
              pass: config.mail.auth.api_key,
            },
          });
    }

    async activityLog(req, userId, description) {
        if (userId) {
            const logs = await ActivityLog.create({
                userId,
                description,
                ipAddress: req.header("x-forwarded-for") || req.connection.remoteAddress,
            });

            return logs;
        }
    }

    Email(data, subject, message) {
        try {
            const email = {
                from: config.app.name,
                to: (data.email) ? data.email : config.app.email,
                subject,
                html: message,
            };

            this.client.sendMail(email, (err, info) => {
                if (err) {
                    console.error(err);
                } else {
                    console.info("Message sent: " + info.response);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    html(data) {
        return  `<div id="content" style="background-color: #1D4BB7width:100%">
            <nav>
                <div class="container-fluid">
                    <span><a href="https://refill-app.herokuapp.com"><img src="https://refillappapi.herokuapp.com/uploads/images/refill_logo.png" style="width: 120px height: 45px padding:10px" class="img-responsive"></a></span>
                </div>
            </nav>
            <div style="background-color: #fefefepadding:20pxcolor:#000">${data}</div>
        </div>`;
    }
}

module.exports = CoreService;