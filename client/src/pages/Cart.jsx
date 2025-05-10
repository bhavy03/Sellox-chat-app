import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { WiDaySunny } from "react-icons/wi";
import { useState } from "react";
import { jsPDF } from "jspdf";


const cartItems = [
  { id: 1, name: "Product 1", price: 299, seller: "Seller 1" },
  { id: 2, name: "Product 2", price: 499, seller: "Seller 2" },
  { id: 2, name: "Product 2", price: 499, seller: "Seller 2" },
  { id: 2, name: "Product 2", price: 499, seller: "Seller 2" },
  { id: 2, name: "Product 2", price: 499, seller: "Seller 2" },
  { id: 2, name: "Product 2", price: 499, seller: "Seller 2" },
  { id: 2, name: "Product 2", price: 499, seller: "Seller 2" },
];

const CartPage = () => {
  //   const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const [showDownload, setShowDownload] = useState(false);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    setShowDownload(true);
  };

const generatePDF = () => {
  const doc = new jsPDF();
  let y = 20;

  // Title
  doc.setFontSize(18);
  doc.text("Purchase Bill", 75, y);
  y += 10;

  // Table headers
  doc.setFontSize(12);
  doc.text("Product", 10, y);
  doc.text("Seller", 80, y);
  doc.text("Price", 160, y, { align: "right" });
  y += 10;

  // Table rows
  cartItems.forEach((item) => {
    doc.text(item.name, 10, y);
    doc.text(item.seller, 80, y);
    doc.text(`${item.price}`, 160, y, { align: "right" });
    y += 10;
  });

  // Total
  y += 10;
  doc.setFontSize(14);
  doc.text(`Total: Rs ${total}`, 160, y, { align: "right" });

  // Save PDF
  doc.save("purchase-bill.pdf");
};


  return (
    <div className="min-h-screen bg-gray-100  min-w-full px-12 py-12">
      <div className="max-w-full mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CiShoppingCart className="text-blue-400" />
            Cart
          </h1>
          <WiDaySunny className="text-yellow-400 text-4xl" />
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            <table className="w-full table-auto border-collapse mt-4">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Product</th>
                  <th className="p-2">Seller</th>
                  <th className="p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.seller}</td>
                    <td className="p-2">₹{item.price}</td>
                  </tr>
                ))}

                {/* <tr className="bg-gray-200">
                    <td><span>Total</span></td>
                    <td></td>
                    <td><span>₹{total}</span></td>
                </tr> */}
              </tbody>
            </table>
            <div className="flex justify-between font-bold text-xl py-4 bg-gray-100">
              <span>Total</span>
              <span className="mr-64">₹{total}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Checkout
            </button>

            {showDownload && (
              <button
                onClick={generatePDF}
                className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Download PDF
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
