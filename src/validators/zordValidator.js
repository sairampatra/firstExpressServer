export const valiadte =(schema,source='body')=>{
    return async (req,res,next) => {
        const data = source == 'query' ? req.query : req.body
        try {
            schema.parse(data)
            
            next()
        } catch (error) {
            return res.status(400).json({
                sucess:false,
                message:'valid  error',
                error:error.errors

            })
        }
    }
}