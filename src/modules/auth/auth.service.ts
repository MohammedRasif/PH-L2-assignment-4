import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const loginUser = async(payload : ILoginUser) => {
    const {email, password} = payload;

    const user = await prisma.user.findUnique({
        where : { email }
    })   

    if(!user){
        throw new Error("User not found");
    }

    if(user.activeStatus === "BLOCKED") {
        throw new Error("You are blocked by the admin");
    }
       
    const isPasswordMatched = await bcrypt.compare(password , user.password)
    if(!isPasswordMatched) {
        throw new Error("Incorrect password");
    }

    const jwtPayload = {
        id : user.id,
        name : user.name,
        email : user.email,
        role : user.role
    }

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_token_secret as string,
        { expiresIn: config.jwt_access_token_expires_in as string } as SignOptions
    )

    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_token_secret as string,
        { expiresIn: config.jwt_refresh_token_expires_in as string } as SignOptions
    )

    return {
        accessToken,
        refreshToken,
    }
}

const refreshToken = async (refreshToken : string) =>{
    const verifiedRefreshToken  = jwtUtils.verifiedToken(
        refreshToken,
        config.jwt_refresh_token_secret as string
    )
    if(!verifiedRefreshToken.success){
        throw Error(verifiedRefreshToken.error);
    }
     const {id} = verifiedRefreshToken.data as JwtPayload;
     
    const user = await prisma.user.findUniqueOrThrow({
        where : {
            id
        }
    })
    
    if(user.activeStatus === "BLOCKED"){
        throw Error("You are blocked by the admin");
    }

    const jwtPayload = {
        id ,
        name : user.name,
        email : user.email,
        role : user.role
    }

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_token_secret as string,
        { expiresIn: config.jwt_access_token_expires_in as string } as SignOptions
    )

    return {
        accessToken,
    }
}
 
export const authService = {
    loginUser,
    refreshToken
}
