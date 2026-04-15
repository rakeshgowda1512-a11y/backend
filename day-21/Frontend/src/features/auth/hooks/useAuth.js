import { useContext } from "react";
import {login,register,logout} from "../services/auth.api";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
    const {user,setUser,loading,setLoading} = useContext(AuthContext);

    const handleLogin = async ({email,username,password}) => {
        setLoading(true);
        try {
            const response = await login({email,username,password});
            setUser(response.user);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({email,username,password}) => {
        setLoading(true);
        try {
            const response = await register({email,username,password});
            setUser(response.user);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await logout();
            setUser(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return ({
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    })
}