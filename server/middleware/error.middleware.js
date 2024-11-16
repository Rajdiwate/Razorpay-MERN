
export default function(err,req,res,next){
    const statusCode = err.statusCode || 500
    const message = err.message || "something went wrong"

    return res.status(statusCode).json({success : false , message})
}