import { createContext, useState } from "react";

export const userContext = createContext(null)

export const UserProvider = ({children}) =>{
    const [user , setUser] =  useState({name: "" , number : ""})
    
    return(
        <userContext.Provider value={{setUser, user }} >
            {children}
        </userContext.Provider>
    )
}