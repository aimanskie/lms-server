import express from 'express'
import { requireSignin } from '../middlewares'
import {
  register,
  login,
  logout,
  currentUser,
  forgotPassword,
  resetPassword,
  currentUser1,
  confirm,
} from '../controllers/auth.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/current-user', requireSignin, currentUser)
router.get('/confirmation/:token', confirm)
router.get('/current-user1', currentUser1)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

module.exports = router
