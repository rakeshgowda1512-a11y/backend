import React, { useEffect } from 'react'
import { useFollow } from '../hook/useFollow'
import '../style/people.scss'

const People = () => {

    const { users, loading, handleGetUsers, handleFollow, handleUnFollow } = useFollow()

    useEffect(() => {
        handleGetUsers()
    }, [])

    if (loading || !users) {
        return <main><h1>Loading...</h1></main>
    }
return (
    <main className="people-page">
        <div className="people-container">
            <h1>People</h1>
            <div className="users-list">
                {users.map((user) => (
                    <div className="user-row" key={user.username}>
                        <div className="user-info">
                            <div className="avatar-placeholder">
                                {user.username[0].toUpperCase()}
                            </div>
                            <p>{user.username}</p>
                        </div>
                        <button
                            className={`follow-btn ${user.followStatus}`}
                            onClick={() => {
                                if (user.followStatus === 'following' || user.followStatus === 'pending') {
                                    handleUnFollow(user.username)
                                } else {
                                    handleFollow(user.username)
                                }
                            }}
                        >
                            {user.followStatus === 'following' ? 'Following'
                                : user.followStatus === 'pending' ? 'Requested'
                                : 'Follow'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </main>
)
}

export default People