import express from 'express'
import dotenv from 'dotenv'

// other packages
import morgan from 'morgan'

import cors from 'cors'

// security
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import xss from 'xss-clean'

dotenv.config()
import 'express-async-errors'
import connectDB from './db/connect.js'

const app = express()

// middleware imports
import notFoundMiddleWare from './middleware/not-found.js'
import errorHandlerMiddleWare from './middleware/error-handler.js'

// routes imports
import authRouter from './routes/authRoutes.js'
import blogRouter from './routes/blogRoutes.js'
import commentRoute from './routes/commentRoutes.js'

app.use(morgan('tiny'))

app.use(express.static('./public'))

// // security one
// app.set('trust proxy', 1)
// app.use(rateLimit({
//   windowMs : 15 * 60 * 1000,
//   max : 100
// }))

// express.json
app.use(express.json())

// security two
// app.use(helmet())
// app.use(xss())
// app.use(cors());

// routes

// auth route
app.use('/api/v1/auth', authRouter)

// blog route
app.use('/api/v1/blog', blogRouter)

// comment route
app.use('/api/v1/comment', commentRoute)

// middleware
app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 5000

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, () => {
			console.log(`Server listening on port ${port}`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
