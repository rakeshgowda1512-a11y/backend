import React from 'react'
import "../nav.scss"
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

const Nav = () => {
    const navigate = useNavigate()
    const { handleLogout } = useAuth()

    const onLogout = async () => {
        await handleLogout()
        navigate('/login')
    }

    return (
        <nav className='nav-bar'>
            <p>Insta</p>
            <div className="nav-actions">
                <button
                    onClick={() => { navigate("/people") }}
                    className='button secondary-button'>People</button>
                <button
                    onClick={() => { navigate("/follow-requests") }}
                    className='button secondary-button'>Requests</button>
                <button
                    onClick={() => { navigate("/create-post") }}
                    className='button primary-button'>New post</button>
                <button
                    onClick={() => navigate("/profile")}
                    className='button secondary-button'>Profile</button>
                <button
                    onClick={onLogout}
                    className='button logout-button'>Logout</button>
            </div>
        </nav>
    )
}

export default Nav