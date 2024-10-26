import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 10,
			trim: true,
		},

		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: validator.isEmail,
				message: 'Please provide a valid email',
			},
		},

		password: {
			type: String,
			required: true,
		},

		passwordToken: {
			type: String,
		},

		passwordTokenExpirationDate: {
			type: Date,
		},

		verified: {
			type: Date,
		},

		isVerified: {
			type: Boolean,
			default: false,
		},

		verificationToken: {
			type: String,
		},

		role: {
			type: String,
			enum: ['user'],
			default: 'user',
		},
	},
	{ timestamps: true }
)

UserSchema.pre('save', async function () {
	// console.log(this.modifiedPaths())

	if (!this.isModified('password')) return
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePasswords = async function (candidatePassword) {
	const isMatch = bcrypt.compare(candidatePassword, this.password)
	return isMatch
}

// create jwt
UserSchema.methods.createJWT = function () {
	const token = jwt.sign(
		{ userId: this._id, name: this.name, role: this.role },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	)

	return token
}

export default mongoose.model('User', UserSchema)
