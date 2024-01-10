import { createContext, useState } from "react";

export const AuthContext=createContext({
    authToken:'',
    handleauthToken:()=>{},
    userId:'',
    setUserId:()=>{}
});

export const AuthContextProvider=({children})=>{
    const [authToken,setAuthToken]=useState();
    const [userId,setUserId]=useState()

    const handleauthToken=(token)=>{
        setAuthToken(token)
    };
    const value={
        authToken,
        handleauthToken,
        userId,
        setUserId
    }
    return(
        <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
    )
}