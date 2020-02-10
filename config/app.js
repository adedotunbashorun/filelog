const config  = {
    app: {
        port: process.env.PORT,
        name : process.env.APP_ID,
        email : "adedotunolawale@gmail.com",
        JWT_SECRET: process.env.JWT_SECRET ,
    },
    user: process.env.user,
    db: {
        url: process.env.MONGODB_URI,
    },
    data: {
        limit: "50mb",
        extended: false,
    },
    mail: {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD,
        },
    },
    sms: {
        africastalking: {
            apiKey: "", //         // use your sandbox app API key for development in the test environment
            username: "",      // use 'sandbox' for development in the test environment
        },
        twilio: {
            apiKey: "",
            username: "",
        },
    },
    video: {
        vimeo: {
            clientId: "",
            clientSecret: "",
            accessToken: "",
        },
    },
    pusher: {
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_APP_KEY,
        secret: process.env.PUSHER_APP_SECRET,
        cluster: process.env.PUSHER_APP_CLUSTER,
    },
};
exports.config = config