const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const { config } = require("./config/app");
const isAuth = require('./middleware/is-auth');
const express = require("express");
const passport = require("passport");
const router = require("./route");
class AppServer {

    SERVER_STARTED = "Example server started on port: ";
    app = express();

    constructor() {
        this.config();
    }

    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(cors());
        this.app.use(isAuth);
        this.app.use(morgan("dev"));
        require("./config/passport");
        this.mongo();
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use('/api', router);
    }

    mongo() {
        const connection = mongoose.connection;
        connection.on("connected", () => {
          console.info("Mongo Connection Established");
        });
        connection.on("reconnected", () => {
          console.info("Mongo Connection Reestablished");
        });
        connection.on("disconnected", () => {
          console.info("Mongo Connection Disconnected");
          console.info("Trying to reconnect to Mongo ...");
          setTimeout(() => {
            mongoose.connect(config.db.url, {
              useNewUrlParser: true,
              autoReconnect: true, keepAlive: true,
              socketTimeoutMS: 3000, connectTimeoutMS: 3000,
            });
          }, 3000);
        });
        connection.on("close", () => {
          console.info("Mongo Connection Closed");
        });
        connection.on("error", (error) => {
          console.info("Mongo Connection ERROR: " + error);
        });

        const run = async () => {
          await mongoose.connect(config.db.url, {
            useNewUrlParser: true,
            autoReconnect: true, keepAlive: true,
          });
        };
        run().catch((error) => console.info(error));
    }

    start(port) {
        this.app.get("*", (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            console.info(this.SERVER_STARTED + port);
        });
    }
}

module.exports = AppServer;