const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");

router.post("/", async (req, res, next) => {
  try {
    if (req.messageId) {
      const messageId = req.messageId;
      // const unreadMessage = await Message.findMessage(messageId);
      const message = await Message.update(
        { readMessage: true },
        { where: { _id: messageId } }
      );
      return res.json({ message });
    }
  } catch (error) {
    next(error);
  }
});