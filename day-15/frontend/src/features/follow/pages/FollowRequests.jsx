import React, { useEffect } from 'react'
import { useFollow } from '../hook/useFollow'
import '../style/people.scss'

const FollowRequests = () => {

    const { requests, loading, handleGetRequests, handleRespond } = useFollow()

    useEffect(() => {
        handleGetRequests()
    }, [])

    if (loading || !requests) {
        return <main><h1>Loading...</h1></main>
    }

     
    return (
    <main className="requests-page">
        <div className="requests-container">
            <h1>Follow Requests</h1>
            <div className="requests-list">
                {requests.length === 0 && <p className="empty-state">No pending requests</p>}
                {requests.map((request) => (
                    <div className="request-row" key={request.follower}>
                        <div className="user-info">
                            <div className="avatar-placeholder">
                                {request.follower[0].toUpperCase()}
                            </div>
                            <p>{request.follower}</p>
                        </div>
                        <div className="respond-btns">
                            <button className="accept" onClick={() => handleRespond(request.follower, 'accepted')}>Accept</button>
                            <button className="reject" onClick={() => handleRespond(request.follower, 'rejected')}>Reject</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </main>
)


}

export default FollowRequests