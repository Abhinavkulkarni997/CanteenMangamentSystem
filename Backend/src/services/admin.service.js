import ApiError from "../utils/responses/ApiError.js";
import * as repository from "../repositories/admin.repository.js";
// import { SessionType } from "@prisma/client";
import prisma from "../config/prisma.js";

export const verifyQr = async (qrToken) => {
  const order = await repository.findOrderByQrToken(qrToken);

  if (!order) {
    throw new ApiError(404, "Invalid QR code");
  }

  if (order.orderStatus === "COLLECTED") {
    throw new ApiError(400, "Meal already collected");
  }
  return order;
};

// export const collect=async (id)=>{
//     return repository.collectOrder(id);
// };
export const collect = async (id, adminId, device, ipAddress) => {
  const order = await prisma.order.findUnique({
    where: { id },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.orderStatus === "COLLECTED") {
    throw new ApiError(400, "Meal already collected");
  }

  const updatedOrder = await repository.collectOrder(id);

  await repository.createScanLog(id, adminId, device, ipAddress);

  return updatedOrder;
};

// export const dashboard = async () => {
//   const todayStart = new Date();

//   todayStart.setHours(0, 0, 0, 0);

//   const tomorrowStart = new Date(todayStart);

//   tomorrowStart.setDate(tomorrowStart.getDate() + 1);

//   return repository.dashboard(todayStart, tomorrowStart);
// };

export const dashboard = async () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);

  const [
    summary,
    latestOrders,
    mealStats,
    weeklyRevenue,
    todayMenu,
  ] = await Promise.all([
    repository.dashboard(todayStart, tomorrowStart),
    repository.latestOrders(),
    repository.mealStats(todayStart, tomorrowStart),
    repository.weeklyRevenue(),
    repository.dashboardTodayMenu(todayStart, tomorrowStart),
  ]);

  return {
    summary,
    latestOrders,
    mealStats,
    weeklyRevenue,
    todayMenu,
  };
};

export const orders = () => {
  return repository.todayOrders();
};
export const getOrders = (query) => {
    return repository.getOrders(query);
};

export const latestOrders = () => {
  return repository.latestOrders();
};

// export const scanQr = async (qrToken,adminId, device, ipAddress) => {

//     const order = await repository.scanQr(qrToken);

//     if (!order) {

//         throw new ApiError(404, "Invalid QR");

//     }

//     if (order.orderStatus === "COLLECTED") {

//         throw new ApiError(400, "Meal already collected");

//     }

//     await repository.collectOrder(order.id);
//     await repository.createScanLog(

//     order.id,

//     adminId,

//     device,

//     ipAddress

// );

//     return {

//         ...order,

//         orderStatus: "COLLECTED",

//         collectedAt: new Date(),

//     };

// };
const todayMenu =async()=>{
return await repository.dashboardTodayMenu(
  todayStart,
  tomorrowStart
);
} 