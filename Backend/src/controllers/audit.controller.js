import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/responses/ApiResponse.js";
import * as service from "../services/audit.service.js";

export const getLogs = asyncHandler(async (req, res) => {
  const data = await service.getLogs(req.query);

  return res.json(
    new ApiResponse(
      200,
      "Audit logs fetched successfully",
      data
    )
  );
});