import { Chats } from "../Models/chatsModel.js";
import User from "../Models/authModel.js";
import { Message } from "../Models/messageModel.js";
import { getReceiverSocketId, io } from "../index.js";

export const sendMessage = async (req, res) => {
  try {
    // console.log(req.body);
    const { chatId } = req.params;
    const { message, userId } = req.body;
    const recieverId = chatId;
    const senderId = userId;

    let conversation = await Chats.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await Chats.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // will run line by line
    // await conversation.save();
    // await newMessage.save();

    // will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(recieverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
      // console.log("Message sent to receiver", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendmessage controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    // console.log(req.body);
    const { chatId } = req.params;
    const { userId } = req.body;
    const recieverId = chatId;
    const senderId = userId;

    let myMessages = await Chats.findOne({
      participants: { $all: [senderId, recieverId] },
    }).populate("messages");
    if (!myMessages) {
      return res.status(200).json([]);
    }
    res.status(201).json({ myMessages });
  } catch (error) {
    console.log("Error in getmessage controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getConversations = async (req, res) => {
  try {
    // console.log(req.body);
    const { chatId } = req.params;
    const { userId } = req.body;
    const recieverId = chatId;
    const senderId = userId;

    // let user = await User.findById(recieverId);
    // console.log(user);

    let conversation = await Chats.findOne({
      participants: { $all: [senderId, recieverId] },
    });
    if (!conversation) {
      conversation = await Chats.create({
        participants: [senderId, recieverId],
      });
    }

    const users = await Chats.find({ participants: senderId })
      .select("participants")
      .populate("participants");

    const filteredParticipants = users.map((user) => {
      return {
        _id: user._id,
        participants: user.participants.filter(
          (participant) => participant._id.toString() !== senderId
        ),
      };
    });

    res.status(201).json({ filteredParticipants });
  } catch (error) {
    console.log("Error in getConversations controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const allConvos = async (req, res) => {
  try {
    const { userId } = req.body;
    const senderId = userId;

    const users = await Chats.find({ participants: senderId })
      .select("participants")
      .populate("participants");

    const filteredParticipants = users.map((user) => {
      return {
        _id: user._id,
        participants: user.participants.filter(
          (participant) => participant._id.toString() !== senderId
        ),
      };
    });

    res.status(201).json(filteredParticipants);
  } catch (error) {
    console.log("Error in allConvos controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
