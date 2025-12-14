import dotenv from "dotenv";
dotenv.config();

function getEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(` Missing environment variable: ${key}`);
    }
    return value;
}

export const env = {
    PORT: Number(getEnv("PORT")),
    MONGO_URI: getEnv("MONGO_URI"),
    JWT_SECRET: getEnv("JWT_SECRET"),
    JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN") as "1d"
};
