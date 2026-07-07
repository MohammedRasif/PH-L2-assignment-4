import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";

const router  = Router();

router.post("/register" , userController.registerUser  )

router.get("/me", 
auth(Role.ADMIN , Role.TENANT , Role.LANDLORD),
userController.getMyProfile)

export const userRoutes = router;