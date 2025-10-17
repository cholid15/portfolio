import nodemailer from 'nodemailer'

const main = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // ganti 465 -> 587
      secure: false, // TLS akan dinegosiasi otomatis
      service: 'gmail',
      auth: {
        user: 'cholidfajar15@gmail.com',
        pass: 'mqwlnxsbeehkofvf',
      },
    })

    await transporter.verify()
    console.log('✅ Gmail ready')

    const info = await transporter.sendMail({
      from: '"Test Mailer" <cholidfajar15@gmail.com>',
      to: 'cholidfajar15@gmail.com',
      subject: 'Test from Node.js',
      text: 'If you receive this, SMTP works!',
    })

    console.log('✅ Email sent:', info.response)
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

main()
