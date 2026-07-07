import { NextFunction, Request, RequestHandler, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt from "jsonwebtoken";
import { jwtUtils } from "../../utils/jwt";
import { types } from "node:util";

const registerUser = catchAsync( async (req: Request, res: Response, next : NextFunction) => {
    const payload = req.body;
    console.log(payload,"pppppppppppp")
    const user = await userService.registerUserIntoBD(payload);

    sendResponse(res , {
        statusCode : httpStatus.CREATED,
        success : true,
        message : "User registered successfully",
        data : {
            user
        }
    })
})


const getMyProfile = catchAsync( async (req:Request, res:Response , next : NextFunction) =>{
    const profile = await userService.getMyProfileFromDB(req.user?.id as string)

    sendResponse(res , {
        statusCode : httpStatus.OK,
        success : true,
        message : "User profile fetched successfully",
        data : {
            profile
        }
    })
})

const updateProfile = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const payload = req.body;
    const updatedProfile = await userService.updateMyProfileFromDB(userId, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile updated successfully",
        data: { updatedProfile }
    })
})

export const userController = {
    registerUser,
    getMyProfile,
    updateProfile
}