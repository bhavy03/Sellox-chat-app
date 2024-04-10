import mongoose, { Schema, Types } from "mongoose";

const schema = new Schema(
  {
    senderId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    recieverId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    content: String,
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", schema);
