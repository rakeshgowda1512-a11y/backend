import { createContext , useState } from "react";

export const FollowContext= createContext()

export const FollowContextProvider= ({children})=>{

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [requests, setRequests] = useState([])

    return(
        <FollowContext.Provider value ={{loading,setLoading,users,setUsers,requests,setRequests}} >
            {children}
        </FollowContext.Provider>
    )

}