import { StatusCodes } from 'http-status-codes'
import User from '../models/User.js'
import BadRequestError from '../errors/bad-request.js'
import UnAuthenticatedError from '../errors/unauthenticated.js'
import crypto from 'node:crypto'
import sendVerifiedEmail from '../utils/sendVerifiedToken.js'
import createTokenUser from '../utils/createTokenUser.js'

const register = async (req, res) => {
	const { name, email, password } = req.body
	// checking for empty values
	if (!name || !email || !password) {
		throw new BadRequestError('Some values were not provided')
	}

	// check if user already exits
	const emailAlreadyExists = await User.findOne({ email })

	if (emailAlreadyExists) {
		throw new BadRequestError('User already exits try creating a different one')
	}

	// verification token
	const verificationToken = crypto.randomBytes(40).toString('hex')

	const origin = 'http://localhost:3000'

	const user = await User.create({
		name,
		email,
		password,
		verificationToken,
	})

	// send email
	await sendVerifiedEmail({
		name: user.name,
		email: user.email,
		verificationToken: user.verificationToken,
		origin,
	})

	res.status(StatusCodes.CREATED).json({ msg: 'Check email to verify account' })
}

const verifyEmail = async (req, res) => {
	const { email, verificationToken } = req.body

	// empty values
	if (!email || !verificationToken) {
		throw new BadRequestError('Some values were not provided')
	}

	// check user
	const user = await User.findOne({ email })
	if (!user) {
		throw new UnAuthenticatedError('User verification failed')
	}

	// validating verification token
	if (user.verificationToken !== verificationToken) {
		throw new UnAuthenticatedError('User verification has failed')
	}

	;(user.isVerified = true), (user.verified = Date.now())
	user.verificationToken = ''

	await user.save()

	res.status(StatusCodes.OK).json({ msg: 'User verified' })
}

const login = async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		throw new BadRequestError('Some values were not provided')
	}

	const user = await User.findOne({ email })

	if (!user) {
		throw new UnAuthenticatedError('Invalid Credentials')
	}

	const passwordmatch = await user.comparePasswords(password)

	if (!passwordmatch) {
		throw new UnAuthenticatedError('Invalid email or password')
	}

	if (!user.isVerified) {
		throw new BadRequestError('Please verify account before logging in')
	}

	const tokenUser = createTokenUser(user)

	const token = await user.createJWT()
	res.status(StatusCodes.OK).json({ user: tokenUser, token })
}

export { register, login, verifyEmail }
