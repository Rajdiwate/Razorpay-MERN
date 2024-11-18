import { axiosInstance } from "../axios"


const createOrder  = async()=>{
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


export {createOrder}