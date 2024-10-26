import express from 'express'
import { authenticatedUser } from '../middleware/authentication.js'
import {
	addComment,
	updateComment,
	deleteComment,
} from '../controllers/commentController.js'

const router = express.Router()

router.patch('/:blogId', authenticatedUser, addComment)
router.patch(
	'/blog/:blogId/comment/:commentId',
	authenticatedUser,
	updateComment
)
router.delete(
	'/blog/:blogId/comment/:commentId',
	authenticatedUser,
	deleteComment
)

export default router
