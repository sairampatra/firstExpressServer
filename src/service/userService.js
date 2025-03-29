import { createUser, findUserByEmail } from "../repository/userRepo.js";
import bcrypt from 'bcrypt';  // Import bcrypt
import { generateToken } from "../utils/jwt.js";
export const signupService = async (userCredentialsobj) => {

    return await createUser(userCredentialsobj)
} 

export const signInService = async (userCredentialsobj) => {
    const user = await findUserByEmail(userCredentialsobj.email);

    if(!user){
        throw {
            status: 404,
            message: "User does'nt exists in DB 🐢"
        } 
    }
    // Check if password matchs
    const isPassValid =   bcrypt.compareSync(userCredentialsobj.password,user.password);
    console.log(isPassValid)
    if(!isPassValid){
        throw {
            status: 401,
            message:  "Password notmatchigir0-fdio"
        }
    }      
    
    // Generate JWT
    const token = generateToken({email: user.email , _id: user._id , username: user.username , role:user.role || 'user'})
    // console.log(token)
           return token
                                

}
export const checklfUserExists = async (email) => {
    try {
        const user = await findUserByEmail(email)
        return user
    } catch (error) {
        throw error
    }
}