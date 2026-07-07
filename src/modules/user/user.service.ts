import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./user.interface";


const registerUserIntoBD = async (payload : RegisterUserPayload) =>{
    const {name , email, password, profilePhoto} = payload;
 const isUserExist = await prisma.user.findUnique({
        where :{
            email
        }
    })
    if(isUserExist) {
        throw new Error("User with this email is already exists")
    }

    const hashedPassword = await bcrypt.hash(password , Number(config.bcrypt_salt_rounds));
    
const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password : hashedPassword,
            
        }
    })

    await prisma.profile.create({
        data: {
            userId : createdUser.id,
            profilePhoto,
        }
    })
    const user = await prisma.user.findUnique({
        where :{
            id : createdUser.id,
            email : createdUser.email || email
        },
        omit : {
            password
        },
        include : {
            profile : true
        }
    })

   return user
}

export const userService = {
    registerUserIntoBD
}