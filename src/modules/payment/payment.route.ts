import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create",
  auth(Role.TENANT, Role.ADMIN),
  paymentController.createPayment
);

router.post(
  "/confirm",
  auth(Role.TENANT, Role.ADMIN),
  paymentController.confirmPayment
);

router.get(
  "/",
  auth(Role.TENANT, Role.ADMIN),
  paymentController.getMyPayments
);

router.get(
  "/:id",
  auth(Role.TENANT, Role.ADMIN),
  paymentController.getPaymentById
);




router.post("/stripe/webhook", paymentController.stripeWebhook);

export const paymentRoutes = router;
