import { NextFunction, Request, Response } from "express";
import { paymentService } from "./payment.service";
import { catchAsync } from "../../utils/catchAsync";

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

const sslCommerzSuccess = async (req: Request, res: Response, next: NextFunction) => {};

const sslCommerzFail = async (req: Request, res: Response, next: NextFunction) => {};

const sslCommerzCancel = async (req: Request, res: Response, next: NextFunction) => {};

const stripeWebhook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const signature = req.headers['stripe-signature'] as string;
  const rawBody = (req as any).rawBody; 
  if (!rawBody || !signature) {
    res.status(400).send("Webhook Error: Missing body or signature");
    return;
  }

  const result = await paymentService.stripeWebhook(rawBody, signature);
  res.status(200).json(result);
});

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
