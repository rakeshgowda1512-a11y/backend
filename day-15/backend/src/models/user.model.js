const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"user already existed"],
        required:[true,'username is required']
    },
    email:{
        type:String,
        unique:[true,"email already existed"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/pve5z0jtq/profilepic.webp"
    },
    followers:[{
         type: mongoose.Schema.Types.ObjectId,
         ref:"users"
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }],
}, { timestamps: true })

// Cascade Delete Middleware
userSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        const userId = doc._id
        const username = doc.username

        try {
            // Use late-binding require to avoid circular dependencies
            const postModel = mongoose.model("posts")
            const likeModel = mongoose.model("likes")
            const commentModel = mongoose.model("comments")
            const saveModel = mongoose.model("saves")
            const followModel = mongoose.model("follows")

            // 1. Delete all posts by this user
            const userPosts = await postModel.find({ user: userId }).select('_id').lean()
            const postIds = userPosts.map(p => p._id)

            await Promise.all([
                postModel.deleteMany({ user: userId }),
                likeModel.deleteMany({ post: { $in: postIds } }),
                commentModel.deleteMany({ post: { $in: postIds } }),
                saveModel.deleteMany({ post: { $in: postIds } })
            ])

            // 2. Delete user's interactions on other posts
            await Promise.all([
                likeModel.deleteMany({ user: username }),
                commentModel.deleteMany({ user: username }),
                saveModel.deleteMany({ user: username })
            ])

            // 3. Cleanup Follows
            await Promise.all([
                followModel.deleteMany({ $or: [{ follower: username }, { followee: username }] }),
                mongoose.model("users").updateMany({}, { $pull: { followers: userId, following: userId } })
            ])

            console.log(`Cascade delete completed for user: ${username}`)
        } catch (err) {
            console.error("Cascade delete failed in middleware", err)
        }
    }
})


const userModel=mongoose.model("users",userSchema)


module.exports=userModel