import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import { getUsers,getUserById,createUser,updateUser,updateUserStatus,resetPassword } from "../controllers/user.controller.js";
import { uploadUserPhoto } from "../middleware/upload.middleware.js";
const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUsers
);
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUserById
);
// router.post(
//   "/",
//   authMiddleware,
//   roleMiddleware("ADMIN"),
//   createUser
// );
router.post(
    "/",
    authMiddleware,
     roleMiddleware("ADMIN"),
    uploadUserPhoto.single("photo"),
    createUser
);
// router.put(
//   "/:id",
//   authMiddleware,
//   roleMiddleware("ADMIN"),
//   updateUser
// );
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  uploadUserPhoto.single("photo"),
  updateUser
);
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN", "SUPER_ADMIN"),
  updateUserStatus
);
router.put(
  "/:id/reset-password",
  authMiddleware,
  roleMiddleware("ADMIN", "SUPER_ADMIN"),
  resetPassword
);
export default router;