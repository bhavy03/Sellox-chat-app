import Cart from "../Models/cartModel.js";
import Notification from "../Models/notificationModel.js";
import mongoose from "mongoose";
// import Card from "../Models/cardModel.js";

export async function addToCart(buyerId, productId, quantity = 1) {
  try {
    let cart = await Cart.findOne({ buyer: buyerId });
    if (!cart) {
      // Create a new cart for the user if it doesn't exist
      cart = new Cart({
        buyer: buyerId,
        items: [{ product: productId, quantity }],
      });
    } else {
      // Check if product is already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // If product already in cart, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If new product, push to items array
        cart.items.push({ product: productId, quantity });
      }
    }
    await cart.save();
    return { success: true, message: "Item added to cart", cart };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false, message: "Failed to add item to cart", error };
  }
}

// GET all items in the buyer's cart
export async function getCartItems(req, res) {
  const { buyerId } = req.params;

  try {
    const cart = await Cart.findOne({ buyer: buyerId }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "Cart is empty", items: [] });
    }

    res.status(200).json({
      success: true,
      message: "Cart items retrieved successfully",
      items: cart.items,
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch cart items", error });
  }
}

// BUYER confirms purchase
export async function checkoutCart(req, res) {
  const { buyerId } = req.params;
  const cart = await Cart.findOne({ buyer: buyerId }).populate("items.product");

  if (!cart || cart.items.length === 0) return;

  for (const item of cart.items) {
    const product = item.product;
    // console.log(product);
    // Send notification to seller
    const notif = new Notification({
      seller: product.sellerId,
      buyer: buyerId,
      product: product._id,
      message: `Your product "${product.productName}" has been purchased!`,
    });

    await notif.save();
  }
  // Clear cart after purchase
  cart.items = [];
  await cart.save();
  res.status(200).json({ message: "Items ordered successfully" });
}

export const getSellerNotifications = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const notifications = await Notification.find({
      seller: new mongoose.Types.ObjectId(sellerId),
    })
      .populate("product", "productName") // Populate product title (optional)
      .populate("buyer", "name") // Populate buyer name (optional)
      .sort({ date: -1 }); // Most recent first
    // console.log(notifications);
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};
