import { createContext,useState,useEffect } from "react";
import { getme } from "./services/auth.api";

export const AuthContext= createContext()

export function AuthProvider({children}){

    const [user, setuser] = useState(() => {
        const savedUser = localStorage.getItem('insta_user')
        return savedUser ? JSON.parse(savedUser) : null
    })
    const [loading, setloading] = useState(!user) // If we have a saved user, don't show full loading

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await getme()
                setuser(response.user)
                localStorage.setItem('insta_user', JSON.stringify(response.user))
            } catch (err) {
                setuser(null)
                localStorage.removeItem('insta_user')
            } finally {
                setloading(false)
            }
        }
        loadUser()
    }, [])
    
    return(
        <AuthContext.Provider value={{user,setuser,loading,setloading}}>
            {children}
        </AuthContext.Provider>
    )
}