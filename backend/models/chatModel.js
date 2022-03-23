const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  chatRoomId: {
    type: String,
    required: true,
  },

  people: [
    {
      type: String,
      required: true,
    },
  ],

  chats: [
    {
      senderId: {
        type: String,
        required: true,
      },

      text: {
        type: String,
        required: true,
      },

      timestamp: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);
