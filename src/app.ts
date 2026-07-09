import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import httpStatus from "http-status";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.routes";
import { categoryRoutes } from "./modules/category/category.route";
import { propertyRoutes } from "./modules/property/property.route";
import { rentalRequestRoutes } from "./modules/rentalRequest/rentalRequest.route";
import { paymentRoutes } from "./modules/payment/payment.route";
import { reviewRoutes } from "./modules/review/review.route";
import { profileRoutes } from "./modules/profile/profile.route";
import { adminRoutes } from "./modules/admin/admin.route";


const app: Application = express();


app.use(cors({
  origin: config.app_url,
  credentials: true,

}))

app.use(express.json({
  verify: (req: Request, res: Response, buf: Buffer) => {
    (req as any).rawBody = buf;
  }
}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req: Request, res: Response) => {
  res.send("hello,world")
})


app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/properties", propertyRoutes)
app.use("/api/requests", rentalRequestRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/admin", adminRoutes)

export default app;