import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req,res) => {
    // res.status(200).json({
    //     message: "User registration Successful. "
    // });

    // get user details from frontend
    // validations - not empty
    // check if user already exists: using email, username
    // check for images, check for avatar
    // upload them to cloudnary
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation success
    // return response to frontend

    const { fullName, email, username, password } =req.body
    console.log("email: ", email);

    // Beginners way
    // if(fullName === "")
    // {
    //     throw new apiError(400, "Full name is required.")
    // }

    // Advanced way
    if(
        [fullName, email, username, password].some((field) => 
        field?.trim() === "")
    ){
        throw new apiError(400, "All fields are required. ");
    }

    // To check if the user already exists...
    // check in db using email or username
    const userExists = User.findOne({
        $or: [{ username }, { email }] /* these are operators => (doller : $)or:[{},{}] */
    })

    // if user exists, throw error
    if(userExists) {
        throw new apiError(409, "User already exists with the given email or username. ");
    }

    const avatarLocalPath = req.files?.avatar[0/* Object */]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    console.log("avatarLocalPath: ", avatarLocalPath); // just for checking
    console.log("coverImageLocalPath: ", coverImageLocalPath); // just for checking

    if(!avatarLocalPath) {
        throw new apiError (400, "Avatar file is required. ");
    }
    if(!coverImageLocalPath) {
        throw new apiError (400, "Avatar file is required. ");
    }


    // upload files to cloudinary
    const avatarImageUploadResponse = await uploadOnCloudinary(avatarLocalPath);
    const coverImageUploadResponse = await uploadOnCloudinary(coverImageLocalPath);

    console.log("avatarImageUploadResponse: ", avatarImageUploadResponse); // just for checking
    console.log("coverImageUploadResponse: ", coverImageUploadResponse); // just for checking

    if(!avatarImageUploadResponse) {
        throw new apiError (400, "Avatar file Upload Unsuccessful. ");
    }
    if(!coverImageUploadResponse) {
        throw new apiError (400, "Cover Image file Upload Unsuccessful. ");
    }

    const user = await User.create({
        fullName,
        avatar: avatarImageUploadResponse.url,
        coverImage: coverImageLocalPath.url,
        email,
        password,
        username: username.toLowerCase(),        
    })

    // check if user creation is successful by findBbyId
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    // check if user creation is successful
    if(!createdUser) {
        throw new apiError(500, "User registration unsuccessful. Please try again later.")
    }

    return res.status(201).json(
        new apiResponse(200, createdUser, "User registered successfully.")
    )
});

export { registerUser };