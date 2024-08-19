import asyncHander from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from '../utils/Cloudinay.js'
import { ApiResponce } from "../utils/ApiResponce.js"
const registerUser = asyncHander(async (req, res) => {

/**
 * get user details from frontend
 * validation - not empty
 * check if user is alreadly exists 
 * avatar , cover image on cloudinary
 * create user object - create entry in db
 * remove  passowrd and refresh token from response
 * check for user creation 
 * return res
 */

    const { fullName, email, username, password } =
        req.body
    console.log("email:", email, "\nfullName:", fullName);
    if ([fullName, email, username, password].some((field) =>
        field?.trim() === "")

    ) {
        throw new ApiError(400, "Please fill all the fields.")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with Username or email already exist")
    }
    const avatarLocalPath = req.files.avater[0]?.path;
    const coverImageLocalPath = req.files.avater[0]?.path;

    if (!avatarLocalPath) {

        throw new ApiError(400, "Avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")

    }
    const user = await User.create({
        fullName,
        username: username.toLowerCase(), password,
        email, avatar: avatar.url, coverImage: coverImage.url || "",
    })
    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createUser){
        throw new ApiError(500, "Enternal server error")
    }
    return res.status(201).json(
        new ApiResponce(201, "User created successfully", createUser)
    )


})

export { registerUser }