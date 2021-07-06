const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isRead: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

Message.findMessages = async function (otherUserId, conversationId) {
  const messages = await Message.findAll({
    where: {
      senderId: otherUserId,
      conversationId: conversationId,
      isRead: false
    }
  });

  return messages;
};

module.exports = Message;
