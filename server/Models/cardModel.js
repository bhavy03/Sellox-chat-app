import { mongoose, Types } from "mongoose";

const cardSchema = new mongoose.Schema({
  imageName: String,
  imageUrl: String,
  productName: String,
  price: Number,
  phoneNo: Number,
  sellerName: String,
  sellerId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  details: String,
  duration: String,
  postingDate: {
    type: Date,
    default: Date.now(),
  },
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
