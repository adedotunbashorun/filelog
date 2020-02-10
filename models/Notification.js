const mongoose  = require("mongoose");
const Schema = mongoose.Schema;


const notificationSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true},
    type: {type: String, required: true},
    data: {type: Object, required: true},
    status: {type: String, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
