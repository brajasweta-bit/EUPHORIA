import jwt from 'jsonwebtoken'


const authUser = async (req,res,next)=>{
    const {token} = req.headers
    if(!token){
        return res.status(200).json({success:false,message:'Not authorized login again'})
    }

    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

export default authUser