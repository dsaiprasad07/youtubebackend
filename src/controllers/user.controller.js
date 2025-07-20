// Import necessary utilities and modules
import { asyncHandler } from "../utils/asyncHandler.js"; // wrapper for handling async errors
import { ApiError } from "../utils/ApiError.js";         // custom error class
import { User } from "../models/user.model.js";          // Mongoose User model
import cloudinaryUpload from "../utils/cloudniray.js";   // cloudinary upload function
import { ApiResponse } from "../utils/ApiResponse.js";   // custom success response class

// Controller function to handle user registration
const registerUser = asyncHandler(async (req, res) => {

  // Step 1: Extract fields from request body
  const { fullName, name: userName, password, email } = req.body;
  console.log("fullName:", fullName); // Debug log

  // Step 2: Check if any required field is empty or missing
  if ([fullName, email, password, userName].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Step 3: Check if user with same email or fullName already exists in DB
  const existUser = await User.findOne({
    $or: [{ email }, { fullName }],
  });

  if (existUser) {
    throw new ApiError(409, "User already exists with provided details");
  }

  // Step 4: Get avatar and coverImage file paths from request (uploaded via multer)
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  // Step 5: If avatar is not provided, throw an error
  if (!avatarLocalPath) {
    throw new ApiError(401, "Avatar is required");
  }

  // Step 6: Upload files to Cloudinary and get the URLs
  const avatar = await cloudinaryUpload(avatarLocalPath);
  const coverImage = await cloudinaryUpload(coverImageLocalPath);

  // Step 7: Ensure avatar was uploaded successfully
  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
  }

  // Step 8: Create new user in the database
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,                       // Will be hashed in model pre-save middleware
    userName: userName.toLowerCase(), // Convert username to lowercase before saving
  });

  // Step 9: Fetch newly created user and exclude sensitive fields like password & refreshToken
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  // Step 10: Check if user creation was successful
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering");
  }

  // Step 11: Return success response with the created user data
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User Registered Successfully")
  );
});

// Export the controller function
export {
  registerUser,
};
