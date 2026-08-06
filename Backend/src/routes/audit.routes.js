import { Router } from "express";
import * as controller from "../controllers/audit.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = Router();

router.use(authMiddleware);
router.use(roleMiddleware("ADMIN", "SUPER_ADMIN"));

router.get("/", controller.getLogs);

export default router;