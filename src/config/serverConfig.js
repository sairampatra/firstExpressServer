import dotenv from 'dotenv'
dotenv.config()
export const DB_URL = process.env.DB_URL;


export const cloud_name= process.env.CLOUDINARY_CLOUD_NAME
export const api_key= process.env.CLOUDINARY_API_KEY
export const api_secret= process.env.CLOUDINARY_API_SECRET
export const JWT_SECRECT= process.env.JWT_SECRECT