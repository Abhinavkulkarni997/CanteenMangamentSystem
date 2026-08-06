import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  verifyQr,
  collectOrder,
  dashboard,
  todayOrders,
  latestOrders,
  getOrders,
  // scanQr
} from "../controllers/admin.controller.js";

const router = Router();

router.post("/verify-qr", authMiddleware, roleMiddleware("ADMIN"), verifyQr);

router.put(
  "/collect/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  collectOrder,
);

router.get("/dashboard", authMiddleware, roleMiddleware("ADMIN"), dashboard);

router.get("/today-orders", authMiddleware, roleMiddleware("ADMIN"), todayOrders);
router.get(
  "/latest-orders",

  authMiddleware,

  roleMiddleware("ADMIN"),

  latestOrders,
);
router.get("/orders", authMiddleware, roleMiddleware("ADMIN"), getOrders);
// router.post(
//     "/scan-qr",
//     authMiddleware,
//     roleMiddleware("ADMIN"),
//     scanQr
// )

export default router;
