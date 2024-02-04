const {Router} = require('express')

// controllers
const {
    allPosts,
    newPost,
    deletePost,
} = require('../controllers/notesControllers')

// middlewares
const {
    privateRoutes,
} = require('../middlewares/privateRoutes')

const router = Router()

// all posts
router.get('/all-posts',allPosts)

// add new post
router.post('/add-post',privateRoutes,newPost)

// delete post
router.delete('/delete-post/:_id',privateRoutes,deletePost)

module.exports = router