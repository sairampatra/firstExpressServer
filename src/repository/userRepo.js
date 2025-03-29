import { User } from "../schema/user.js";

export const findAllUsers = async () => {
    try {

        const users = await User.find({})
        return users
    } catch (error) {
        console.log(error);

    }
}

export const findUserByEmail = async (para)=>{
    try {
        const user = await User.findOne({email:para})
        return user;
    } catch (error) {
        console.log(error);
        
    }
}


export const deleteAllUsers = async()=>{
    try {
        const users = await User.deleteMany({});
        return users

    } catch (error) {
        console.log(error);

    }
}

export const createUser = async(userCredentialsObj)=>{
    try {
        
      const signupUser = await new User(userCredentialsObj).save() 
   
      return signupUser
       } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000 ) {
            throw{
                status:400,
                message:"User with the same email or username already exists"
            }
        }
   throw error
       }
}