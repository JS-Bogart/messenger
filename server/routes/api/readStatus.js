const router = require("express").Router();
const { Message } = require("../../db/models");

router.post("/", async (req, res, next) => {
  try {
    const conversationId = req.body.conversationId;
    const otherUserId = req.body.otherUserId; 
    const unreadMessages = await Message.findMessages(otherUserId, conversationId);
    
    unreadMessages.forEach(async (message) => {
      await message.update(
        { messageRead: true },
      );
    });
    
    return res.json({ unreadMessages });
  } catch (error) {
    next(error);
  }
});

module.exports = router;