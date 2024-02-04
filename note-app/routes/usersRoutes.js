const {Router} = require('express')

// controllers
const {
    signup,
    login,
    logout,
    checkAuth,
    allUsers,
} = require('../controllers/usersControllers')

// middlewares
const {
    privateRoutes,
} = require('../middlewares/privateRoutes')

const router = Router()

// signup
router.post('/signup',signup)

// login
router.post('/login',login)

// logout
router.get('/logout',logout)

// check-auth
router.get('/check-auth',privateRoutes,checkAuth)

// get all users
router.get('/all-users',allUsers)

module.exports = router