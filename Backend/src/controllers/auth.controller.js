import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/responses/ApiResponse.js";
import { registerUser,getProfile,loginUser } from "../services/auth.service.js";
import userResponse from "../utils/responses/userResponse.js";
import { changePasswordSchema } from "../validations/user.validator.js";
import * as service from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {

    const user = await registerUser(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            "User registered successfully",
            userResponse(user)
        )
    );

});

export const login = asyncHandler(async (
    req,
    res
) => {

    // const { mobile, password } = req.body;

    const result =
        await loginUser(
            req.body
        );

    return res.status(200).json(

        new ApiResponse(
            200,
            "Login Successful",
            {
                user: userResponse(result.user),
                token: result.token
            }
        )

    );

});

export const profile = asyncHandler(async (req, res) => {

    const user = await getProfile(req.user.id);

    return res.status(200).json(

        new ApiResponse(
            200,
            "Profile fetched successfully",
            userResponse(user)
        )

    );

});


export const changePassword = asyncHandler(
  async (req, res) => {

    const payload =
      changePasswordSchema.parse(req.body);

    const data =
      await service.changePassword(
        req.user.id,
        payload
      );

    return res.status(200).json(

      new ApiResponse(
        200,
        "Password changed successfully",
        data
      )

    );

  }
);