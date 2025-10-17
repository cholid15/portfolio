// backend/routes/contact.js
import express from 'express'
import nodemailer from 'nodemailer'
import logger from '../config/logger.js'

const router = express.Router()

router.post('/contact', async (req, res) => {
  const { firstname, lastname, email, phone, service, message } = req.body || {}

  logger.info(`--- NEW /api/contact request ---`)
  logger.info(`Method: POST, Body: ${JSON.stringify(req.body)}`)

  // Log ke console juga untuk debugging
  console.log('📥 Received contact request:', {
    firstname,
    lastname,
    email,
    service,
  })

  if (!firstname || !lastname || !email || !message || !service) {
    logger.error('❌ Validation failed - missing required fields')
    console.error('❌ Missing fields:', {
      firstname,
      lastname,
      email,
      message,
      service,
    })
    return res.status(400).json({
      success: false,
      message: 'Please fill all required fields.',
    })
  }

  try {
    logger.info('🔧 Creating nodemailer transporter...')

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Gunakan service: 'gmail' lebih reliable
      auth: {
        user: 'cholidfajar15@gmail.com',
        pass: 'mqwlnxsbeehkofvf', // PASTIKAN ini App Password yang valid!
      },
    })

    logger.info('🔍 Verifying transporter connection...')
    await transporter.verify()
    logger.info('✅ Gmail transporter verified and ready')

    const mailOptions = {
      from: 'cholidfajar15@gmail.com', // HARUS dari akun Gmail Anda
      replyTo: email, // User bisa reply ke email pengirim
      to: 'cholidfajar15@gmail.com',
      subject: `New Contact from ${firstname} ${lastname} - ${service}`,
      html: `<div style="font-family: Arial, sans-serif; color: #333;">
              <h2>📩 New Contact Message</h2>
              <p><strong>Name:</strong> ${firstname} ${lastname}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || '-'}</p>
              <p><strong>Service:</strong> ${service}</p>
              <hr>
              <p><strong>Message:</strong></p>
              <blockquote style="background: #f4f4f4; padding: 15px; border-left: 4px solid #007bff;">${message}</blockquote>
              </div>`,
    }

    logger.info('📧 Sending email...')
    const info = await transporter.sendMail(mailOptions)
    logger.info(`✅ Email sent successfully: ${info.messageId}`)
    console.log('✅ Email sent:', info.response)

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!',
    })
  } catch (err) {
    logger.error(`❌ Email send error: ${err.message}`)
    logger.error(`Stack trace: ${err.stack}`)
    console.error('❌ Full error:', err)

    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error:
        process.env.NODE_ENV === 'development'
          ? err.message
          : 'Internal server error',
    })
  }
})

export default router
