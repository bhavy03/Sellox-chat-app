import mongoose, { Schema, Types } from "mongoose";

const schema = new Schema(
  {
    participants: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Chats = mongoose.model("Chats", schema);
