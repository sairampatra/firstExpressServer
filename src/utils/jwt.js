import jwt from 'jsonwebtoken'
import { JWT_SECRECT } from '../config/serverConfig.js'
export const generateToken= (payload)=>{
return jwt.sign(payload, JWT_SECRECT,{
    expiresIn: "1d"
})
}

export const verifyToken = (token)=>{
return jwt.verify(token,JWT_SECRECT)
}   