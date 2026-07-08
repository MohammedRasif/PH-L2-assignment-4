import { NextFunction, Request, Response } from "express";
import { paymentService } from "./payment.service";

// ========================
// Payment Controller
// ========================

// POST /api/payments/create
const createPayment = async (req: Request, res: Response, next: NextFunction) => {};

// POST /api/payments/confirm  (manual confirm or Stripe webhook)
const confirmPayment = async (req: Request, res: Response, next: NextFunction) => {};

// GET /api/payments
const getMyPayments = async (req: Request, res: Response, next: NextFunction) => {};

// GET /api/payments/:id
const getPaymentById = async (req: Request, res: Response, next: NextFunction) => {};

// POST /api/payments/ssl/success  (SSLCommerz success callback)
const sslCommerzSuccess = async (req: Request, res: Response, next: NextFunction) => {};

// POST /api/payments/ssl/fail  (SSLCommerz fail callback)
const sslCommerzFail = async (req: Request, res: Response, next: NextFunction) => {};

// POST /api/payments/ssl/cancel  (SSLCommerz cancel callback)
const sslCommerzCancel = async (req: Request, res: Response, next: NextFunction) => {};

// POST /api/payments/stripe/webhook  (Stripe webhook)
const stripeWebhook = async (req: Request, res: Response, next: NextFunction) => {};

export const paymentController = {
  createPayment,
  confirmPayment,
  getMyPayments,
  getPaymentById,
  sslCommerzSuccess,
  sslCommerzFail,
  sslCommerzCancel,
  stripeWebhook,
};
