import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const jwtUtils = {
    createToken: (payload: any, secret: string, options: SignOptions) => {
        return jwt.sign(payload, secret, options);
    },
    verifiedToken: (token: string, secret: string) => {
        try {
            const decoded = jwt.verify(token, secret);
            return { success: true, data: decoded as JwtPayload };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
};
