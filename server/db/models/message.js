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
  messageRead: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

// Message.findMessage = async function (messageId) {
//   const message = await Message.findOne({
//     where: {
//       id: messageId
//     }
//   });

//   return message;
// };

Message.findMessages = async function (otherUserId, conversationId) {
  const messages = await Message.findAll({
    where: {
      senderId: otherUserId,
      conversationId: conversationId,
      messageRead: false
    }
  });

  return messages;
};

module.exports = Message;
