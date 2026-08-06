import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/responses/ApiResponse.js";

import * as service from "../services/admin.service.js";
// import { dashboard } from "../repositories/admin.repository.js";

export const verifyQr = asyncHandler(async (req, res) => {
  console.log(req.body);
  const order = await service.verifyQr(req.body.qrToken);

  return res.status(200).json(
    new ApiResponse(
      200,

      "QR Verified",

      order,
    ),
  );
});

export const collectOrder = asyncHandler(async (req, res) => {
  const order = await service.collect(
    Number(req.params.id),
    req.user.id,
    req.headers["user-agent"] ?? "",
    req.ip,
  );

  return res.status(200).json(
    new ApiResponse(
      200,

      "Meal Collected",

      order,
    ),
  );
});

export const dashboard = asyncHandler(async (req, res) => {
  const data = await service.dashboard();

  return res.status(200).json(
    new ApiResponse(
      200,

      "Dashboard",

      data,
    ),
  );
});

export const todayOrders = asyncHandler(async (req, res) => {
  const data = await service.orders();

  return res.status(200).json(
    new ApiResponse(
      200,

      "Today's Orders",

      data,
    ),
  );
});

export const latestOrders = asyncHandler(async (req, res) => {
  const orders = await service.latestOrders();

  return res.status(200).json(
    new ApiResponse(
      200,

      "Latest Orders",

      orders,
    ),
  );
});

export const getOrders = asyncHandler(async (req, res) => {
  const result = await service.getOrders(req.query);

  return res.status(200).json(
    new ApiResponse(
      200,

      "Orders",

      result,
    ),
  );
});

// export const scanQr = asyncHandler(async (req, res) => {

//     const order = await service.scanQr(req.body.qrToken, req.user.id,
//     req.headers["user-agent"],
//     req.ip);

//     return res.status(200).json(

//         new ApiResponse(

//             200,

//             "Meal Collected",

//             order

//         )

//     );

// });
