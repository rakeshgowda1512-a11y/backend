import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hook/usePost'

const Feed = () => {

  const { feed, handleGetFeed, loading, handleLike, handleUnLike ,handleFollow, handleUnFollow, handleSave, handleUnSave, handleDelete, comments, activePost, handleToggleComments, handleAddComment,handleDeleteComment} = usePost()
  
  useEffect(() => {
    handleGetFeed()
  }, [])

  if (loading || !feed) {
    return (
      <div className='feed-page'>
        <div className="feed" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <h1 style={{ color: 'var(--text-primary)', fontSize: '1.2rem' }}>Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className='feed-page'>
      <div className="feed">
        <div className="posts">
          {feed.map(post => (
            <Post
              key={post._id}
              user={post.user}
              post={post}
              loading={loading}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
              handleFollow={handleFollow}   
              handleUnFollow={handleUnFollow}
              handleSave={handleSave}
              handleUnSave={handleUnSave}
              handleDelete={handleDelete}
              comments={comments}
              activePost={activePost}
              handleToggleComments={handleToggleComments}
              handleAddComment={handleAddComment}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Feed