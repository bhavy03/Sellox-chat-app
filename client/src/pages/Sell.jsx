import { useSelector } from "react-redux"
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import useMyDetails from "../hooks/useMyDetails";
import toast from "react-hot-toast"

const Sell = () => {
  const { isAuthenticated } = useSelector((state) => state.card);
  // const { userdata } = useSelector((state) => state.card);
  // console.log(userdata.user)
  const navigate = useNavigate();
  const { phoneNo, sellerName } = useMyDetails()
  // console.log("phone", phoneNo, sellerName)
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object from the form data
    const formData = new FormData(event.target);
    formData.append("sellerName", sellerName);
    formData.append("phoneNo", phoneNo);
    console.log(formData)

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}user/sell`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        toast.success("Form submitted successfully")
      } else {
        toast.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    navigate("/");
  };

  return (
    <>{
      isAuthenticated ?
        <div className="w-full px-6 ">
          <div className="flex justify-center items-center w-full h-screen bg-transparent">
            <form encType="multipart/form-data" className="flex flex-col w-full max-w-md p-6 bg-white rounded-lg shadow-xl" onSubmit={handleSubmit}>
              <p className=" text-center text-3xl mb-7 leading-8  font-sans font-semibold">Sell your items</p>

              <label htmlFor="productName" className="block font-medium text-gray-900 mb-2">Productname</label>
              <input type="text" name="productName" id="productName" required className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-[#B4B4B8] hover:shadow-md bg-white" />

              <label htmlFor="image" className="block font-medium text-gray-900 mb-2">Upload Image:</label>
              <input type="file" name="image" id="image" accept="image/*" required className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 mb-5 file:px-4 file:rounded-md  file:border-0 file:font-semibold file:bg-[#0ea5e9] file:text-white file:text-xl ring-hover:file:bg-violet-100" />


              <label htmlFor="details" className="block font-medium text-gray-500 mb-2">Details:</label>
              <textarea className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-[#B4B4B8]  hover:shadow-md bg-white" rows="4" cols="50" name="details" id="details" required></textarea>

              <label htmlFor="price" className="block font-medium text-gray-500 mb-2">price</label>
              <input type="number" name="price" id="price" required className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-[#B4B4B8] hover:shadow-md bg-white" />

              <div className="flex flex-col">
                <div>Review your details</div>
                <div className="flex flex-row">
                  <div className="flex flex-col mr-2">
                    <label htmlFor="sellerName" className="block font-medium text-gray-500 mb-2">Your name</label>
                    <div className="block w-full h-10 p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-[#B4B4B8] hover:shadow-md bg-white" >
                      {sellerName}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phoneNo" className="block font-medium text-gray-500 mb-2">Contact details</label>
                    <div className="block h-10 w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-[#B4B4B8] hover:shadow-md bg-white" >
                      {phoneNo}
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full py-3 px-4 bg-[#0ea5e9] hover:bg-[#38caff] hover:shadow-xl text-white font-bold rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">Post now</button>
            </form>
          </div >
        </div >
        : <Login />
    }
    </>
  )
}

export default Sell
