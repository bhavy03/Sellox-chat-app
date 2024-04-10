import { useState, useEffect } from "react";
// import toast from "react-hot-toast";

const useMyDetails = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNo, setPhoneNo] = useState();
  const [sellerName, setsellerName] = useState();
  const myId = localStorage.getItem("userId");
  //   const myId = myDetail?.user?._id;
  //   console.log(myDetail.user._id);
  // if (isAuthenticated) {
  //   }

  useEffect(() => {
    const getMe = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER}user/${myId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const myDetails = await response.json();
        // console.log(myDetails.user.phoneNo);
        setPhoneNo(myDetails.user.phoneNo);
        setsellerName(myDetails.user.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    getMe();
  }, [myId]);

  return { loading, phoneNo, sellerName };
};
export default useMyDetails;
