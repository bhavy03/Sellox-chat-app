import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const notificationSchema = new Schema({
  seller: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: String,
  product: {
    type: Types.ObjectId,
    ref: "Card",
  },
  buyer: {
    type: Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
