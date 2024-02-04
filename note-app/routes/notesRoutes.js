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
router.get('/all-notes',allPosts)

// add new post
router.post('/add-note',privateRoutes,newPost)

// delete post
router.delete('/delete-note/:_id',privateRoutes,deletePost)

module.exports = router