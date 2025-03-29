import { signInService, signupService } from "../service/userService.js"

export const getProfile =async (req,res) => {
   res.status(500).json({
    sucess:false,
     message:'unimplimanted'
   }) 
    
}
export const signup =async (req,res) => {
   try {
      const user = await signupService(req.body)
      res.status(201).json({
       sucess:true,
        message:'user craeated',
        data:user
      }) 
   } catch (error) {
      if (error.status) {
         return res.status(error.status).json({
            sucess:false,
            message:error.message
         })
         
      }
      console.log(error)
      res.status(500).json({
         sucess:false,
          message:'internal server error'
        }) 
   }
  
    
}

export const signin = async (req,res) => {
   // console.log(req.body)
   const user = await signInService(req.body)
   res.status(201).json({
      sucess:true,
        message:'user signined',
        data:user
   })
}

