import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./user.interface";

const registerUserIntoBD = async (payload : RegisterUserPayload) =>{
    const {name , email, password, profilePhoto, role} = payload;
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
            role
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
            password: true
        },
        include : {
            profile : true
        }
    })

   return user
}

const getMyProfileFromDB = async (userId : string) => {
    const user = await prisma.user.findUnique({
        where : {
            id : userId
        },
        omit : {
            password : true
        },
        include : {
            profile : true
        }
    })
    return user
} 

const updateMyProfileFromDB = async (userId : string, payload : any) => {
    const {name, email, profilePhoto, bio} = payload;

    const updatedUser = await prisma.user.update({
        where : { id : userId},

        data : {
            name,
            email,
            profile : {
                update : {
                    profilePhoto,
                    bio
                }
            }
        },

        omit : {
            password : true
        },

        include : {
            profile : true
        }
    })

    return updatedUser;
}

export const userService = {
    registerUserIntoBD,
    getMyProfileFromDB,
    updateMyProfileFromDB
}