import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/bad-request.js'
import NotFoundError from '../errors/not-found.js'
import Blog from '../models/Blog.js'

const getAllBlogs = async (req, res) => {
	const blogs = await Blog.find({})
	res.status(StatusCodes.OK).json({ blogs, count: blogs.length })
}

const getBlog = async (req, res) => {
	const { id } = req.params

	const blog = await Blog.findOne({ _id: id })

	if (!blog) {
		throw new NotFoundError('Blog not found')
	}

	res.status(StatusCodes.OK).json({ blog })
}

const createBlog = async (req, res) => {
	const { title, body, tags } = req.body

	if (!title || !body || !tags) {
		throw new BadRequestError('Some values were not provided')
	}

	// if blog already exist

	const blogExists = await Blog.findOne({ title, createdBy: req.user.userId })

	if (blogExists) {
		throw new BadRequestError('Blog already exists')
	}

	const blog = await Blog.create({
		title,
		body,
		tags,
		author: req.user.name,
		createdBy: req.user.userId,
		...req.body,
	})

	res.status(StatusCodes.CREATED).json({ blog })
}

const updateBlog = async (req, res) => {
	const { id: blogId } = req.params

	const blog = await Blog.findOneAndUpdate(
		{ _id: blogId, createdBy: req.user.userId },
		req.body,
		{ new: true, runValidators: true }
	)

	if (!blog) {
		throw new NotFoundError('Blog not found')
	}

	res.status(StatusCodes.OK).json({ msg: 'Blog updated', blog })
}

const deleteBlog = async (req, res) => {
	const { id } = req.params

	const blog = await Blog.findOne({ _id: id })

	if (!blog) {
		throw new NotFoundError('Blog not found')
	}
	await Blog.deleteOne({ _id: id })
	res.status(StatusCodes.OK).json({ msg: 'Blog deleted' })
}

export { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog }
