const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");

router.patch("/", async (req, res, next) => {
  try {
    const { conversationId, otherUserId} = req.body;
    const unreadMessages = await Message.findMessages(
      otherUserId, 
      conversationId
    );
    const userId = req.user.id;
    let isValidUser = await Conversation.isUserInConversation(
      userId, 
      conversationId
    );

    if (isValidUser) {
      unreadMessages.forEach(async (message) => {
        await message.update(
          { isRead: true },
        );
      });
      return res.sendStatus(204);
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;