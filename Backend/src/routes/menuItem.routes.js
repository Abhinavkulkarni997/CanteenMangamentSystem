import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import validate from "../middleware/validation.middleware.js";
import { menuValidation } from "../validations/menuItem.validation.js";
import { createMenu,getTodayMenu,getAllMenus,updateMenu,updateAvailability,deleteMenu,getMenuHistory } from "../controllers/menuItem.controller.js";

const router=Router();
router.get("/today",getTodayMenu);
router.get(
    "/history",
    authMiddleware,
    roleMiddleware("ADMIN"),
    getMenuHistory
);

router.get("/",authMiddleware,roleMiddleware("ADMIN"),getAllMenus);
router.post("/",authMiddleware,roleMiddleware("ADMIN"),menuValidation,validate,createMenu);
router.put("/:id",authMiddleware,roleMiddleware("ADMIN"),updateMenu);
router.delete("/:id",authMiddleware,roleMiddleware("ADMIN"),deleteMenu);
router.patch("/:id/availability",authMiddleware,roleMiddleware("ADMIN"),updateAvailability);

export default router;