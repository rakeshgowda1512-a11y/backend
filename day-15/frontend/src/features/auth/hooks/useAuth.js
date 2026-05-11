import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../auth.context";
import { login, register, getme, updateProfile, logout } from "../services/auth.api"

export function useAuth() {

    const context = useContext(AuthContext)
    const { user, setuser, loading: authLoading, setloading } = context
    const [loading, setLoading] = useState(false)

    const handleLogin = async (username, password) => {
        setLoading(true)
        try {
            const response = await login(username, password)
            setuser(response.user)
            localStorage.setItem('insta_user', JSON.stringify(response.user))
            return response
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "Invalid username or password"
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true)
        try {
            const response = await register(username, email, password)
            setuser(response.user)
            localStorage.setItem('insta_user', JSON.stringify(response.user))
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "Registration failed. Please try again."
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const handleRefreshUser = async () => {
        try {
            const fresh = await getme()
            setuser(fresh.user)
            localStorage.setItem('insta_user', JSON.stringify(fresh.user))
        } catch (err) {
            console.error("Failed to refresh user", err)
        }
    }

    const handleUpdateProfile = async (imageFile, bio) => {
        await updateProfile(imageFile, bio)
        await handleRefreshUser()
    }




    const handleLogout = async () => {
        try {
            await logout()
        } catch (err) {
           
        } finally {
            setuser(null)
            localStorage.removeItem('insta_user')
        }
    }

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) return
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/auth/delete-account`, { withCredentials: true })
            setuser(null)
            localStorage.removeItem('insta_user')
        } catch (err) {
            console.error("Delete account failed", err)
            throw new Error(err?.response?.data?.message || "Failed to delete account")
        }
    }


    return { user, loading, authLoading, handleLogin, handleRegister, handleUpdateProfile, handleLogout, handleRefreshUser, handleDeleteAccount }
}