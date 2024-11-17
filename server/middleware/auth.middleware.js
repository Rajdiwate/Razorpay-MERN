import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  try {
    // Check for the JWT token in cookies or Authorization header
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {

        return next(new ApiError("Please login to access this resource", 401));
      }
    

    // Verify the JWT if it exists
    const decodedToken = jwt.verify(token.trim(), process.env.ACCESS_TOKEN_SECRET);

    // Fetch user information from the database
    const user = await User.findById(decodedToken?._id).select("-refreshToken");

    if (!user) {
      throw new ApiError("Access Token is invalid or expired", 401);
    }

    req.user = user; // Set the user on the request object for JWT-authenticated users
    next();
  } catch (error) {
    // Handle any errors that occur during token verification
    return next(new ApiError(error?.message || "Invalid Access Token", 500));
  }
};
