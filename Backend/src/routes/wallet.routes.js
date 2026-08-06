import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import * as controller from "../controllers/wallet.controller.js";

const router = Router();

router.use(authMiddleware);


// admin wallet apis
router.post(
  "/:userId/credit",
  roleMiddleware("ADMIN", "SUPER_ADMIN"),
  controller.creditWallet
);

router.post(
  "/:userId/debit",
  roleMiddleware("ADMIN", "SUPER_ADMIN"),
  controller.debitWallet
);
router.get(
  "/user/:userId",
  roleMiddleware("ADMIN", "SUPER_ADMIN"),
  controller.getWallet
);

router.get(
  "/user/:userId/balance",
  roleMiddleware("ADMIN", "SUPER_ADMIN"),
  controller.getWalletBalance
);

router.get(
  "/user/:userId/transactions",
  roleMiddleware("ADMIN", "SUPER_ADMIN"),
  controller.getWalletTransactions
);



// user wallet apis
router.get(
    "/me",
    controller.getMyWallet
);

router.get(
    "/me/balance",
    controller.getMyWalletBalance
);

router.get(
    "/me/transactions",
    controller.getMyWalletTransactions
);

export default router;