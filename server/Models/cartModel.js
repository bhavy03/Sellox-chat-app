import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const cartItemSchema = new Schema({
  product: {
    type: Types.ObjectId,
    ref: "Card", // product reference
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new Schema({
  buyer: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
