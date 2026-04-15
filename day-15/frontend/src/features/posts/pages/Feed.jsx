import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hook/usePost'
import { useFollow } from '../../follow/hook/useFollow'
import Nav from '../../shared/components/Nav'

const Feed = () => {

  const { feed, handleGetFeed, loading, handleLike, handleUnLike ,handleDelete, comments, activePost, handleToggleComments, handleAddComment,handleDeleteComment} = usePost()
  const { handleFollow, handleUnFollow } = useFollow()  
  useEffect(() => {
    handleGetFeed()
  }, [])

  if (loading || !feed) {
    return <main><h1>Feed is Loading...</h1></main>
  }

  return (
    <main className='feed-page'>
      <Nav />
      <div className="feed">
        <div className="posts">
          {feed.map(post => (
            <Post
              user={post.user}
              post={post}
              loading={loading}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
              handleFollow={(username) => handleFollow(username, handleGetFeed)}   
              handleUnFollow={(username) => handleUnFollow(username, handleGetFeed)}
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
    </main>
  )
}

export default Feed