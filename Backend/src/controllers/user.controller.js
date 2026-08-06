import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/responses/ApiResponse.js";

import * as service from "../services/user.service.js";
import {
  createUserSchema,
  updateUserSchema,
  updateUserStatusSchema,
  resetPasswordSchema,
} from "../validations/user.validator.js";

export const getUsers = asyncHandler(async (req, res) => {
  const data = await service.getUsers(req.query);

  return res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully", data));
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await service.getUserById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "User fetched successfully", user));
});
export const createUser = asyncHandler(async (req, res) => {
  const data = createUserSchema.parse(req.body);
  if (req.file) {
    data.photoUrl = `/uploads/users/${req.file.filename}`;
  }

  console.log("BODY:", req.body);
console.log("FILE:", req.file);

  const user = await service.createUser(data);

  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", user));
});
export const updateUser = asyncHandler(async (req, res) => {
  const payload = updateUserSchema.parse(req.body);

   if (req.file) {
    payload.photoUrl = `/uploads/users/${req.file.filename}`;
  }


  const user = await service.updateUser(req.params.id, payload, req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, "User updated successfully", user));
});
export const updateUserStatus = asyncHandler(async (req, res) => {
  const { isActive } = updateUserStatusSchema.parse(req.body);

  const user = await service.updateUserStatus(
    req.params.id,
    isActive,
    req.user,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        `User ${isActive ? "activated" : "deactivated"} successfully`,
        user,
      ),
    );
});

export const resetPassword = asyncHandler(async (req, res) => {
  const payload = resetPasswordSchema.parse(req.body);

  const user = await service.resetPassword(req.params.id, payload, req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset successfully.", user));
});
