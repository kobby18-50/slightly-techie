import express from 'express'
import {
	getAllBlogs,
	getBlog,
	createBlog,
	updateBlog,
	deleteBlog,
} from '../controllers/blogController.js'
import { authenticatedUser } from '../middleware/authentication.js'

const router = express.Router()

router.route('/').get(getAllBlogs).post(authenticatedUser, createBlog)
router
	.route('/:id')
	.get(getBlog)
	.patch(authenticatedUser, updateBlog)
	.delete(authenticatedUser, deleteBlog)

export default router
