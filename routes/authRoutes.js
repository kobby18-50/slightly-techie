import { register, login, verifyEmail } from '../controllers/authController.js'
import express from 'express'

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.post('/verify-email', verifyEmail)

export default router
