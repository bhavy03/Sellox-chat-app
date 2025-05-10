import Cart from "../Models/cartModel.js";
import Notification from "../Models/notificationModel.js";
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

// BUYER confirms purchase
export async function checkoutCart(req, res) {
  const { buyerId } = req.params;
  const cart = await Cart.findOne({ buyer: buyerId }).populate("items.product");

  if (!cart || cart.items.length === 0) return;

  for (const item of cart.items) {
    const product = item.product;

    console.log(product);

    // Send notification to seller
    const notif = new Notification({
      seller: product.sellerId,
      buyer: buyerId,
      product: product._id,
      message: `Your product "${product.productName}" has been purchased!`,
    });

    await notif.save();
    console.log
  }

  // Clear cart after purchase
//   cart.items = [];
//   await cart.save();
  res.status(200).json({message: "This is list of all items in cart"})
}
