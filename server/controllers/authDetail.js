import User from "../Models/authModel.js";
import bcrypt from "bcrypt";
import sendCookie from "../middlewares/sendCookie.js";

export const login = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        sucess: false,
        message: "Invalid email or password",
      });
    }
    sendCookie(user, res, 200);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Internal server error");
  }
};

export const register = async (req, res) => {
  // console.log(req.body);
  const { name, email, collegeId, password, phoneNo } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return res.status(404).json({
      success: false,
      message: "user already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    collegeId,
    phoneNo,
    password: hashedPassword,
  });

  let newUser = await User.findOne({ email });
  sendCookie(newUser, res, 201);
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      // sameSite: process.env.NODE_ENV === 'devleopment' ? 'lax' : 'none',
      // secure: process.env.NODE_ENV === 'devleopment' ? false : true
    })
    .json("logged out");
};

export const getUser = async (req, res) => {
  // console.log(req.body);
  const { myId } = req.params;
  // console.log(myId);
  const user = await User.findOne({ _id: myId });
  // console.log(user);
  res.status(200).json({ user });
};
