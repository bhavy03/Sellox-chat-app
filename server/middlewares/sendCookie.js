import jwt from "jsonwebtoken";

const sendCookie = (user, res, statusCode = 200) => {
  // console.log(user);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    // .cookie("token", token, {
      // httponly: false,
      // maxAge: 7 * 24 * 60 * 60 * 1000,
      // sameSite: "none",
      // secure: true,
      // sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      // secure: process.env.NODE_ENV === "Development" ? false : true,
    .json({
      success: true,
      token:token,
      user,
    });
};

export default sendCookie;
