import jwt from "jsonwebtoken";
import { createError } from "../utils/createError";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      return next(createError(401, "Authentication fail"));
    }
    req.user = user;
    req.token = token;
    // console.log(req.user);
    next();
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Not authenticated",
    });
  }
};
