const Messenger = require("../models/Messenger");

const send = async (req, res) => {
  const { email, title, message } = req.body;
  if (req.cookies?.send)
    return res.status(400).json({ message: "You need to wait for 10 minutes" });
  try {
    const messenger = await Messenger.create(req.body);
    res.cookie("send", true, {
      httpOnly: true,
      maxAge: 600 * 1000,
    });
    return res.status(200).json({ message: "Sent successfully" });
  } catch (err) {
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

const getMessageId = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Messenger.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    return res.status(200).json(message);
  } catch (err) {
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

const getMessagesAll = async (req, res) => {
  try {
    const messages = await Messenger.find();
    if (!messages)
      return res.status(404).json({ messages: "Messages not found" });
    return res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Message Id not fount" });
    }
    const messageId = await Messenger.findById(id);
    console.log(messageId);
    if (!messageId) {
      return res.status(404).json({ message: "Message not found" });
    }
    await Messenger.deleteOne({ _id: id });
    return res.status(200).json({ message: "Success message deleted" });
  } catch (err) {
    res.status(400).json({
      message: "Error deleting message",
    });
  }
};

module.exports = {
  send,
  getMessageId,
  getMessagesAll,
  deleteMessage,
};
