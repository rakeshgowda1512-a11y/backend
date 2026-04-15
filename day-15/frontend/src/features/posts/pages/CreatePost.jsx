import React,{useState,useRef,useEffect} from 'react'
import "../style/createpost.scss"
import { usePost } from '../hook/usePost'
import {useNavigate} from 'react-router'

const CreatePost = () => {

    const [caption, setCaption] = useState("")
    const [previewUrl, setPreviewUrl] = useState(null)
    const postRef=useRef(null)

    const navigate = useNavigate()

    const {loading,handleCreatePost}=usePost()

    // Clean up object URL on unmount to avoid memory leaks
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
        }
    }, [previewUrl])

    function handleFileChange(e) {
        const file = e.target.files[0]
        if (file) {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    async function handleSubmit(e){
       e.preventDefault()
       const file= postRef.current.files[0]

       if (file) {
           const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
           if (!allowedTypes.includes(file.type)) {
               alert('Only JPG, JPEG, and PNG images are allowed!')
               return
           }
       }

     await handleCreatePost(file,caption)

     navigate('/feed')

     
    }

    if(loading){
        return(<main><h1>creating post</h1></main>)
    }

  return (
    <main className='create-post-page'>
        <div className="form-container">
            <h1>Create post</h1>
            <form onSubmit={handleSubmit}>
                <label className='create-post-label' htmlFor="postImage">Select image</label>
                <input ref={postRef} hidden type="file" accept=".jpg,.jpeg,.png" name="postImage" id="postImage" onChange={handleFileChange} />
                {previewUrl && (
                    <div className="image-preview-wrapper">
                        <img src={previewUrl} alt="Preview" className="image-preview" />
                    </div>
                )}
                <input 
                value={caption}
                onChange={(e)=>{setCaption(e.target.value)}}
                type="text" name='caption' id='caption' placeholder='Enter Caption'/>
                <button className='button primary-button'>create post</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost
