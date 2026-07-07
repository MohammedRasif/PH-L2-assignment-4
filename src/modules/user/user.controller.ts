import { NextFunction, Request, RequestHandler, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

// const registerUser = async (req:Request , res : Response) =>{
//     try {
//         const payload = req.body;
//     const user = await userService.registerUserIntoBD(payload)
    
   
//     res.status(httpStatus.CREATED).json({
//         success : true , 
//         statusCode : httpStatus.CREATED,
//         message:"user register successfully",
//         data : {
//             user
//         }
//     })
//     } catch (error) {
//         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             success : false , 
//             statusCode : httpStatus.INTERNAL_SERVER_ERROR,
//             message:(error as Error).message
//         })
//     }
    
// }




const registerUser = catchAsync( async (req: Request, res: Response, next : NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoBD(payload);


    // res.status(httpStatus.CREATED).json({
    //     success: true,
    //     statusCode: httpStatus.CREATED,
    //     message: "User registered successfully",
    //     data: {
    //         user
    //     }
    // })

    sendResponse(res , {
        statusCode : httpStatus.CREATED,
        success : true,
        message : "User registered successfully",
        data : {
            user
        }
    })
})


export const userController = {
    registerUser
}