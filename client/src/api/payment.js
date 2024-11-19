import { axiosInstance } from "../axios"


const createOrder  = async(amount)=>{
    try {
        const {data} = await axiosInstance.post('/create-order' , {amount} , {withCredentials:true})
        if(data.success){
            return data.order
        }
        else return null
    } catch (error) {
        console.log("create Order error :" , error.message)
    }
}


const createCfSession = async({amount , number})=>{
    try {
        const {data} = await axiosInstance.post('/cf/create-session' ,{amount ,number} ,{withCredentials:true})
        if(data.success){
            return data.session
        }
        return null
    } catch (error) {
        console.log("create cashfree session error" , error)
    }
}


const verifyCfPayment = async(order_id)=>{
    try {
        const {data} = await axiosInstance.post('/cf/verifyPayment' , {order_id} , {withCredentials:true})
        if(data.success){
            //payment verified redirect to success payment page
            return true
        }
        return false
    } catch (error) {
        console.log(error)
    }
}

export {createOrder , createCfSession , verifyCfPayment}