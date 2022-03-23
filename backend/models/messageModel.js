const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    date: { type: String, required: true },
    receiverId: { type: String, required: true },
    senderId: { type: String, required: true },
    senderType: { type: String, required: true },
    message: { type: String, required: true },
    senderName: { type: String, required: true },
    receiverName: { type: String, required: true }
});

module.exports = mongoose.model("Message", messageSchema);

