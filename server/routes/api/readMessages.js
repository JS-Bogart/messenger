const router = require("express").Router();
const { Message } = require("../../db/models");

router.post("/", async (req, res, next) => {
  try {
    const { conversationId, otherUserId} = req.body;
    const unreadMessages = await Message.findMessages(otherUserId, conversationId);
    
    unreadMessages.forEach(async (message) => {
      await message.update(
        { isRead: true },
      );
    });
    
    return res.json({ unreadMessages });
  } catch (error) {
    next(error);
  }
});

module.exports = router;