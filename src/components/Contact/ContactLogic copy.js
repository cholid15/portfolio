import axios from 'axios'
import Swal from 'sweetalert2'

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
    console.log('📤 URL: http://localhost:5000/api/contact')

    const res = await axios.post(
      'http://localhost:5000/api/contact',
      formData,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
        withCredentials: false, // 🔹 Tambahkan ini
      }
    )

    console.log('📥 Response from backend:', res.data)

    await new Promise((resolve) => setTimeout(resolve, 800))
    Swal.close()

    if (res.data && res.data.success) {
      Swal.fire({
        title: 'Success!',
        text: res.data.message,
        icon: 'success',
        timer: 2000,
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
    } else {
      Swal.fire('Error', res.data?.message || 'Failed to send message', 'error')
    }
  } catch (err) {
    Swal.close()
    console.error('❌ Axios Error:')
    console.error('Status:', err.response?.status)
    console.error('Data:', err.response?.data)
    console.error('Message:', err.message)

    Swal.fire(
      'Error!',
      err.response?.data?.message || 'Something went wrong. Please try again.',
      'error'
    )
  }
}
