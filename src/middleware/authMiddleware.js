import { checklfUserExists } from "../service/userService.js"
import { verifyToken } from "../utils/jwt.js"

export const isAuthenticated = async (req,res,next)=>{
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(400).json({
            sucess:false,
            message:'Token is required'
        })
    }
    try {
        const response =  verifyToken(token)
        // console.log(response?.email)
        const doesUserExists = await checklfUserExists(response.email);
        if (!doesUserExists) {
            return res.status(404).json({
                sucess:false,
                message:"invalid token"
            })
            
        }
        req.user = response  //we r creatingauserfield in req and placing response which is user data
next()
    } catch (error) {
        return res.status(401).json({
            sucess:false,
            message:'Invali token'
        })
    }

}

export const isAdmin = (req , res , next) => {
    console.log(req.user)
    if(req.user.role !== "admin"){
        return res.status(401).json({
            status: 401,
            message: "U not admin"
        });
    }

    next()
}
// export const isUser = (req , res , next) => {
//     if(req.user.role !== "user"){
//         return res.status(401).json({
//             status: 401,
//             message: "u not user."
//         });
//     }

//     next()
// }