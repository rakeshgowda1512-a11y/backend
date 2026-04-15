import React, { useRef } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import '../style/profile.scss'
import Nav from '../../shared/components/Nav'


const Profile = () => {

    const { user, loading, handleUpdateProfile } = useAuth()
    const imageRef = useRef(null)

    async function handleSubmit(e) {
        e.preventDefault()
        const file = imageRef.current.files[0]
        await handleUpdateProfile(file)
    }

    if (loading) {
        return <main><h1>Loading...</h1></main>
    }

    return (
    <main>
        <Nav />
        <div className="profile-page">
            <div className="avatar-wrapper">
                <img src={user?.profileImage} alt="profile" />
            </div>
            <p className="profile-username">{user?.username}</p>
            <form className="profile-form" onSubmit={handleSubmit}>
                <label htmlFor="profileImage">Change photo</label>
                <input
                    ref={imageRef}
                    hidden
                    type="file"
                    id="profileImage"
                />
                <button type="submit">Save</button>
            </form>
        </div>
    </main>
)
}

export default Profile