import { Router } from "express";
import authRoutes from "./auth.routes.js";
import menuItemRoutes from "./menuItem.routes.js";
import orderRoutes from "./order.routes.js";
import adminRoutes from "./admin.routes.js";
import userRoutes from "./user.routes.js";
import reportRoutes from "./report.routes.js";
import auditRoutes from "./audit.routes.js";
import walletRoutes from "./wallet.routes.js";

const router = Router();

router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "API is healthy"
    });
});

router.use("/auth", authRoutes);
router.use("/menu-items",menuItemRoutes);
router.use("/orders",orderRoutes);
router.use("/admin",adminRoutes);
router.use("/users", userRoutes);
router.use("/reports", reportRoutes);
router.use("/audit", auditRoutes);
router.use("/wallet",walletRoutes);

export default router;