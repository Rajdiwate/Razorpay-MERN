import mongoose from 'mongoose'

const connectDb = async function(){

   try {
    const connectionInstance =  await mongoose.connect(`${process.env.MONGO_URI}razorpay`)
    console.log("mongodb Connected successfully to" , connectionInstance.connection.host)
   } catch (error) {
        console.log("Cannot connect wi9th mongodb", error.message)
        process.exit(1)
   }


}

export default connectDb