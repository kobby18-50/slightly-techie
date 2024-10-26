import Blog from '../models/Blog.js'
import NotFoundError from '../errors/not-found.js'
import { StatusCodes } from 'http-status-codes'

const addComment = async (req, res) => {
	const { blogId } = req.params

	const { userId } = req.user
	const { body } = req.body

	const blog = await Blog.findOneAndUpdate(
		{ _id: blogId },
		{ $push: { comments: { user: userId, body } } },
		{ new: true }
	)
	if (!blog) {
		throw new NotFoundError('Blog not found')
	}

	res.status(StatusCodes.CREATED).json({ msg: 'Comment Added', blog })
}

const updateComment = async (req, res) => {
	const { blogId, commentId } = req.params

	const { userId } = req.user
	const { body } = req.body

	const blog = await Blog.findOneAndUpdate(
		{ _id: blogId },
		{ $set: { comments: { user: userId, body, _id: commentId } } },
		{ new: true }
	)
	if (!blog) {
		throw new NotFoundError('Blog not found')
	}

	res.status(StatusCodes.CREATED).json({ msg: 'Comment Updated', blog })
}

const deleteComment = async (req, res) => {
	const { blogId, commentId } = req.params

	const { userId } = req.user

	const blog = await Blog.findOneAndUpdate(
		{ _id: blogId },
		{ $pull: { comments: { user: userId, _id: commentId } } },
		{ new: true }
	)
	if (!blog) {
		throw new NotFoundError('Blog not found')
	}

	res.status(StatusCodes.CREATED).json({ msg: 'Comment Deleted', blog })
}

export { addComment, updateComment, deleteComment }
