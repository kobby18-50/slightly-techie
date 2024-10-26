import UnAuthenticatedError from '../errors/unauthenticated.js'
import UnAuthourizedError from '../errors/unauthorized.js'
import jwt from 'jsonwebtoken'

const authenticatedUser = (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new UnAuthenticatedError(
			'You are not authorized to access this endpoint'
		)
	}

	const token = authHeader.split(' ')[1]

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET)

		req.user = {
			userId: payload.userId,
			name: payload.name,
			role: payload.role,
		}

		next()
	} catch (error) {
		throw new UnAuthenticatedError('Authentication Invalid')
	}
}

const authorizePermissions = (...role) => {
	return (req, res, next) => {
		if (!req.user.role.includes(role)) {
			throw new UnAuthourizedError('UnAuthorized to access this route')
		}

		next()
	}
}

export { authenticatedUser, authorizePermissions }
