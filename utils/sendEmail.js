import sgMail from '@sendgrid/mail'
import nodeMailerConfig from './nodeMailerConfig.js'
import nodemailer from 'nodemailer'

const sendEmail = async ({ to, subject, text, html }) => {
	const transporter = nodemailer.createTransport(nodeMailerConfig)

	return transporter.sendMail({
		from: '"Kwabena Twitter 👻" <kwabena@mail.com>',
		to,
		subject,
		text,
		html,
	})
}

// const sendEmail = async ({ to, subject, text, html }) => {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//   const msg = {
//     from : 'kobbyokai18@gmail.com',
//     to,
//     subject,
//     text,
//     html
//   }

//   const info = await sgMail.send(msg)
// };

export default sendEmail
