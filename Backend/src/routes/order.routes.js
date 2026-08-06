import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { createOrder } from "../controllers/order.controller.js";
import { myOrders, orderDetails,getOrders,collectOrder,details } from "../controllers/order.controller.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = Router();

router.post(
  "/",

  authMiddleware,

  createOrder,
);
router.get("/my-orders", authMiddleware, myOrders);
// router.get("/:id", authMiddleware, orderDetails);
router.get(
    "/my-orders/:id",
    authMiddleware,
    orderDetails
);
router.get("/",authMiddleware, roleMiddleware("ADMIN"), getOrders);
router.patch(
    "/:id/collect",
    authMiddleware,
    roleMiddleware("ADMIN"),
    collectOrder
);
router.get(
    "/:id",
    details
);


export default router;
