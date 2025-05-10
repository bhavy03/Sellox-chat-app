// import { useDispatch } from 'react-redux';
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaCartShopping } from "react-icons/fa6";
// import { setSearch } from '../redux/features/cardSlice';

const Cards = ({ card }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch()
  const handleClick = () => {
    navigate(`/card/${card._id}`);
    // dispatch(setSearch(""))
  };
  const image = card.imageUrl;
  const userId = localStorage.getItem("userId");
  const productId = card._id;
  // console.log("userId", userId);
  // console.log("productId", productId);  

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent triggering the parent `onClick` event
    const userId = localStorage.getItem("userId");
    const productId = card._id;

    try {
      const response = await fetch("http://localhost:3000/user/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyerId: userId,
          productId,
          quantity: 1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Item added to cart:", data);
        alert("Item added to cart successfully!");
      } else {
        console.error("Failed to add item to cart");
        alert("Failed to add item to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="md:pl-5 pl-3">
        <div onClick={handleClick}>
          <div className="rounded-xl my-3 mx-2 bg-white shadow-lg hover:shadow-2xl">
            <div className="w-60 h-60 flex flex-col p-2">
              <div className="h-2/3 overflow-hidden object-cover shadow-md rounded-lg">
                <img
                  src={image}
                  alt={card.productName}
                  className="w-full h-full object-cover"
                />
                <div>{card.duration}</div>
              </div>
              <div className=" flex flex-col h-1/3 justify-start pt-3">
                <div className="flex justify-between items-center w-full mt-0 mb-2">
                  <p className="flex text-2xl font-semibold align-top items-center">
                    <LiaRupeeSignSolid className="text-3xl flex items-center" />
                    {card.price}
                  </p>
                  <button
                    
                     onClick={handleAddToCart}
                    
                    className=" text-blue-700 p-1 rounded mr-2 "
                  >
                    <FaCartShopping className="text-2xl mr-2 " />
                  </button>
                </div>
                <p className="text-xl font-semibold ml-2">{card.productName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
