const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    description: {
        type: String,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
}, { timestamps: true });


module.exports = mongoose.model('ActiviLog', activitySchema)