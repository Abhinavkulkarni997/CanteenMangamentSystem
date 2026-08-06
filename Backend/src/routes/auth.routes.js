import { Router } from "express";
import { profile, register,changePassword } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import {registerValidation} from "../validations/auth.validations.js";
import validate from "../middleware/validation.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = Router();

router.post("/register",registerValidation,validate, register);

router.post("/login", login);
router.get("/me", authMiddleware,profile);
router.put(
  "/profile/password",
  authMiddleware,
  changePassword
);


export default router;