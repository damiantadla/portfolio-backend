const express = require("express");
const router = express.Router();
const MessengerController = require("../controllers/MessengerController");
const AuthMiddleware = require("../middleware/authMiddleware");

// Send messages to db (access open)
router.post("/send", MessengerController.send);

//Get message from db (access admin)
router.get(
  "/get/:id",
  AuthMiddleware.adminAuth,
  MessengerController.getMessageId,
);

// Get messages from db (access admin)
router.get(
  "/get",
  AuthMiddleware.adminAuth,
  MessengerController.getMessagesAll,
);

//Delete message (access admin)
router.delete(
  "/delete/:id",
  AuthMiddleware.adminAuth,
  MessengerController.deleteMessage,
);

module.exports = router;
