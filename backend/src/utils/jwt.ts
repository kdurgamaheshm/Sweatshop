import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (payload: object): string => {
    const options: SignOptions = {
        expiresIn: env.JWT_EXPIRES_IN
    };

    return jwt.sign(payload, env.JWT_SECRET, options);
};
