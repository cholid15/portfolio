import axios from 'axios'
import Swal from 'sweetalert2'

// ⚙️ KONFIGURASI TELEGRAM BOT - AMAN DARI .env
const TELEGRAM_BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.REACT_APP_TELEGRAM_CHAT_ID

// DEBUG: Cek apakah env terbaca

export const validateForm = (formData) => {
  const { firstname, lastname, email, phone, service, message } = formData
  if (!firstname.trim() || firstname.length < 2)
    return 'Please enter a valid firstname (at least 2 characters).'
  if (!lastname.trim() || lastname.length < 2)
    return 'Please enter a valid lastname (at least 2 characters).'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.trim() || !emailRegex.test(email))
    return 'Please enter a valid email address.'
  if (phone && !/^\d{8,15}$/.test(phone))
    return 'Phone number must contain only numbers (8–15 digits).'
  if (!service || !service.toString().trim()) return 'Please select a service.'
  if (!message.trim() || message.length < 10)
    return 'Message must be at least 10 characters long.'
  return null
}

export const handleSubmitLogic = async (formData, setFormData, validateFn) => {
  const error = validateFn(formData)
  if (error) {
    Swal.fire({
      title: 'Invalid input!',
      text: error,
      icon: 'warning',
    })
    return
  }

  try {
    Swal.fire({
      title: 'Sending...',
      text: 'Please wait while your message is being sent.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

    console.log('📤 Sending contact request with payload:', formData)

    // 📅 Format waktu Indonesia
    const currentTime = new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      dateStyle: 'full',
      timeStyle: 'medium',
    })

    // 📱 Format pesan untuk Telegram
    const telegramMessage = `
🎉 <b>NEW CONTACT MESSAGE!</b>

━━━━━━━━━━━━━━━━━
👤 <b>Name:</b> ${formData.firstname} ${formData.lastname}
📧 <b>Email:</b> <code>${formData.email}</code>
📱 <b>Phone:</b> ${formData.phone || 'Not provided'}
🛠️ <b>Service:</b> ${formData.service}
🕐 <b>Time:</b> ${currentTime}

━━━━━━━━━━━━━━━━━
💬 <b>Message:</b>
<i>${formData.message}</i>

━━━━━━━━━━━━━━━━━
📍 <i>Sent from Portfolio Website</i>
    `.trim()

    // 📤 Kirim ke Telegram
    const telegramResponse = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
      },
      {
        timeout: 10000,
      }
    )

    console.log('✅ Telegram notification sent:', telegramResponse.data)

    await new Promise((resolve) => setTimeout(resolve, 800))

    Swal.close()

    Swal.fire({
      title: 'Success!',
      text: 'Your message has been sent successfully! I will contact you soon.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false,
    })

    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    })
  } catch (err) {
    Swal.close()
    console.error('❌ Error sending message:')
    console.error('Status:', err.response?.status)
    console.error('Data:', err.response?.data)
    console.error('Message:', err.message)

    Swal.fire(
      'Error!',
      'Failed to send message. Please try again or contact me directly.',
      'error'
    )
  }
}
