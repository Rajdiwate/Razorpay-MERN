import { createContext,useState } from "react";


export const userContext = createContext(null)

export const UserProvider = ({children}) =>{
    const [user , setUser] =  useState({name: "" , number : "" })
    const [amount , setAmount] = useState(0)

    return(
        <userContext.Provider value={{ user , setUser , amount , setAmount}} >
            {children}
        </userContext.Provider>
    )
}