import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/responses/ApiResponse.js";
import * as service from "../services/report.service.js";

export const report = asyncHandler(async (req, res) => {
  const data = await service.report(req.query);

 return res.status(200).json(
    new ApiResponse(
        200,
         "Report fetched successfully",
        data,
       
    )
);
});

export const exportExcel = asyncHandler(async (req, res) => {
  const workbook = await service.exportExcel(req.query);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=orders-report.xlsx"
  );

  await workbook.xlsx.write(res);

  res.end();
});