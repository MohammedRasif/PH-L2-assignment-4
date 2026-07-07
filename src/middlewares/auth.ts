import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?:{
                id : string,
                name : string,
                email : string,
                role : Role
            }
        } 
    }
}

export const auth = (...requiredRoles:Role[]) => {
    return catchAsync(async (req: Request, res : Response , next: NextFunction) => {
     const token = req.cookies?.accessToken ? req.cookies.accessToken 
     : 
     req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] 
     :
      req.headers.authorization;

     if(!token) {
        throw new Error ("You are not logged in. please log in access this resource")
     }

        const verifiedToken = jwtUtils.verifiedToken(token, config.jwt_access_token_secret as string)
       
    
        if(!verifiedToken.success){
            throw new Error(verifiedToken.error);
        }
        const {email,name , id ,role} = verifiedToken.data as JwtPayload;

        if( requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("You are not authorized to access this resource");
        }
        const user = await prisma.user.findUnique({
            where : { 
                email
             }
        })
        if(!user){
            throw new Error("User not found");
        }

       if(user.activeStatus === "BLOCKED") {
        throw new Error("You are blocked by the admin");
       }
       req.user = { 
        id,
        name,
        email,
        role
       }
       next()
       
    })
}
