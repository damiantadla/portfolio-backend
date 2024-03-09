const express = require("express");
const router = express.Router();
const MessengerController = require("../controllers/MessengerController");
const AuthMiddleware = require("../middleware/authMiddleware");

// Send messages to db (access open)
router.post("/send", MessengerController.send);

//Get message from db (access closed)
router.get(
  "/getMessage/:id",
  AuthMiddleware.adminAuth,
  MessengerController.getMessageId,
);

// Get messages from db (access closed)
router.get(
  "/getMessages",
  AuthMiddleware.adminAuth,
  MessengerController.getMessagesAll,
);

//Delete message (access closed)
router.delete(
  "/deleteMessage/:id",
  AuthMiddleware.adminAuth,
  MessengerController.deleteMessage,
);

module.exports = router;
