import User from "../Models/authModel.js";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "login first",
    });
  }
  const decoded = jwt.verify(token, "secured");
  let decodedUser = await User.findById(decoded.id);
  req.decodedUser = decodedUser;
  next();
};

export default isAuthenticated;
