import { NextFunction, Request, Response } from "express";
import { paymentService } from "./payment.service";

// ========================
// Payment Controller
// ========================

// POST /api/payments/create
const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tenantId = req.user?.id as string;
    const payload = req.body;
    const result = await paymentService.createPayment(tenantId, payload);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Payment intent created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/payments/confirm  (manual confirm or Stripe webhook)
const confirmPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const result = await paymentService.confirmPayment(payload);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: result.message,
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/payments
const getMyPayments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tenantId = req.user?.id as string;
    const filters = req.query;
    const result = await paymentService.getMyPayments(tenantId, filters);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Payments retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/payments/:id
const getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id as string;
    const result = await paymentService.getPaymentById(id, userId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Payment details retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

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
