import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},

		body: {
			type: String,
			required: true,
		},

		author: {
			type: String,
			required: [true, 'Author is required'],
		},

		tags: {
			type: [String],
			trim: true,
			required: [true, 'Tags are required'],
		},

		comments: [
			{
				user: {
					type: mongoose.Types.ObjectId,
					ref: 'User',
					required: [true, 'User is required'],
				},

				body: {
					type: String,
					required: [true, 'Content body is required'],
				},
			},
		],

		status: {
			type: String,
			enum: ['draft', 'published', 'archived'],
			default: 'draft',
		},

		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'User is required'],
		},
	},
	{ timestamps: true }
)

// adding a virtual to show the length of comments
BlogSchema.virtual('commentsCount').get(function () {
	return this.comments.length
})

BlogSchema.set('toJSON', { virtuals: true })
BlogSchema.set('toObject', { virtuals: true })

export default mongoose.model('Blog', BlogSchema)
