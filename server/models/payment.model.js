import mongoose, { Schema } from "mongoose";


const paymentSchema = new Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
    },
    payment_id :{
        type : String,
        required : true
    },
    order_id : {
        type : String,
        required : true
    },


},{timestamps : true})

export const Payment = mongoose.model('Payment' , paymentSchema)