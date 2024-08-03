import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Middleware to verify JWT and attach user to request
export const requireSignIn = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Authorization failed",
    });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
