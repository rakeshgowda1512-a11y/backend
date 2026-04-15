import React, { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../auth/auth.context'

const Post = ({ user, post, loading, handleLike, handleUnLike, handleFollow, handleUnFollow, handleDelete, comments, activePost, handleToggleComments, handleAddComment,handleDeleteComment }) => {

  const { user: loggedInUser } = useContext(AuthContext)
  const isOwnPost = loggedInUser?.username === user.username
  const [commentText, setCommentText] = useState("") 
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!commentText.trim()) return  
    await handleAddComment(post._id, commentText)
    setCommentText("")  
  }

  return (
    <div className="post">

      <div className="user">
        <div className="img-wrapper">
          <img src={user.profileImage} alt="" />
        </div>
        <p>{user.username}</p>

        {!isOwnPost && (
          <button
            className={`follow-btn ${post.followStatus}`}
            onClick={() => {
              if (post.followStatus === 'following' || post.followStatus === 'pending') {
                handleUnFollow(user.username)
              } else {
                handleFollow(user.username)
              }
            }}
          >
            {post.followStatus === 'following' ? 'Following'
              : post.followStatus === 'pending' ? 'Requested'
              : 'Follow'}
          </button>
        )}
      </div>

      <img src={post.imgUri} alt="" />

      <div className="icons">
        <div className="left">
          <button onClick={() => { post.isLiked ? handleUnLike(post._id) : handleLike(post._id) }}>
            {post.isLiked ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red">
                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z" />
              </svg>
            )}
          </button>

          
          <button onClick={() => handleToggleComments(post._id)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455Z" />
            </svg>
          </button>

          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V2.5L23.5 11L13 19.5V14ZM11 12H15V15.3078L20.3214 11L15 6.69224V10H13C10.5795 10 8.41011 11.0749 6.94312 12.7735C8.20873 12.2714 9.58041 12 11 12Z" />
            </svg>
          </button>
        </div>

        <div className="right">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z" />
            </svg>
          </button>

          {isOwnPost && (
            <button onClick={() => handleDelete(post._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="bottom">
        <p className='caption'>{post.caption}</p>
      </div>

     
      {activePost === post._id && (
        <div className="comments-section">

    
          <div className="comments-list">
            {comments.length === 0 && <p className="no-comments">No comments yet</p>}
            {comments.map((comment) => (
              <div className="comment" key={comment._id}>
                <span className="comment-user">{comment.user}</span>
                <span className="comment-text">{comment.text}</span>

                 {comment.user === loggedInUser?.username && (
            <button 
                className="comment-delete"
                onClick={() => handleDeleteComment(comment._id)}>
                ✕
            </button>
        )}
              </div>
            ))}
          </div>

   
          <form className="comment-form" onSubmit={handleSubmitComment}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit"  className="comment-submit">Post</button>
          </form>

        </div>
      )}

    </div>
  )
}

export default Post