import { useSelector } from "react-redux"
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import useMyDetails from "../hooks/useMyDetails";

const Rent = () => {
  const { isAuthenticated } = useSelector((state) => state.card);
  const navigate = useNavigate();
  const { phoneNo, sellerName } = useMyDetails()
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object from the form data
    const formData = new FormData(event.target);
    formData.append("sellerName", sellerName);
    formData.append("phoneNo", phoneNo);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}user/rent`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    navigate("/");
  };

  return (
    <>
      {isAuthenticated ?
        <div className="w-full h-full py-5 px-6">
          <div className="flex align-center justify-center items-center w-full h-screen bg-transparent">
            <form encType="multipart/form-data" className="flex flex-col w-full max-w-md p-8 bg-white rounded-lg shadow-lg" onSubmit={handleSubmit}>
              <p className=" text-center text-3xl mb-7 leading-8  font-sans font-semibold">Rent your items</p>

              <label htmlFor="productName" className="block text-sm font-medium text-gray-900 mb-2">Productname</label>
              <input type="text" name="productName" id="productName" required className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-[#B4B4B8] hover:shadow-md bg-white" />

              <label htmlFor="image">Upload Image:</label>
              <input type="file" name="image" id="image" accept="image/*" required className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 mb-5 file:px-4 file:rounded-md  file:border-0 file:font-semibold file:bg-[#0ea5e9] file:text-white file:text-xl ring-hover:file:bg-violet-100 bg-white" />


              <label htmlFor="details" className="block text-sm font-medium text-gray-900 mb-2">Details</label>
              <textarea type="text" name="details" id="details" rows="3" cols="50" required className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-[#B4B4B8] hover:shadow-md bg-white" />

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-900 mb-2">
                  Select Duration:
                </label>
                <div>
                  <select name="duration" id="duration" className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-[#B4B4B8] bg-white">
                    <option value="hourly" className="text-xl">Hourly</option>
                    <option value="daily" className="text-xl">Daily</option>
                  </select>
                </div>
              </div>

              <label htmlFor="price" className="block text-sm font-medium text-gray-500 mb-2">Price:</label>
              <input type="number" name="price" id="price" required className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-[#B4B4B8] hover:shadow-md bg-white " />

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


              <button type="submit" className="w-full py-3 px-4 bg-[#0ea5e9] hover:bg-[#38caff] hover:shadow-xl text-white font-bold rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 ">Post now</button>
            </form>
          </div>
        </div>
        : <Login />
      }
    </>
  )
}

export default Rent