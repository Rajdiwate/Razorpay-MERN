import { axiosInstance } from "../axios.js"

const login = async({email , password})=>{
    try {
        const {data}= await axiosInstance.post('/login' , {email , password} , {withCredentials:true} )
        if(data.success){
            return data.user
        }
        return null
    } catch (error) {
        console.log("login error :" , error.message)
    }
}

const logout = async()=>{
    try {
        const {data} = await axiosInstance.get('/logout' , {withCredentials:true})
        if(data.success){
            return true
        }
        return false
    } catch (error) {
        console.log("logout error :" , error.message)

    }
}

const register = async ({name,email , password}) => {
    try {
        const {data}= await axiosInstance.post('/register' , { name, email , password} , {withCredentials:true} )
        if(data.success){
            return data.createdUser
        }
        return null
    } catch (error) {
        console.log("register error :" , error.message)

    }
}

const getCurrentUser = async () => {
    try {
        const {data} = await axiosInstance.get('/user/me' , {withCredentials:true})
        if(data.success){
            return data.user
        }
        return null
    } catch (error) {
        console.log("get user error :" , error.message)

    }
}

export {login , logout , register , getCurrentUser}