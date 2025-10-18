import axios from 'axios'
import Swal from 'sweetalert2'

// 🔍 Validasi form
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

// 🚀 Fungsi untuk submit form
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
      didOpen: () => Swal.showLoading(),
    })

    // 📨 Kirim ke backend PHP
    // Gunakan IP atau domain backend PHP (bukan "localhost" dari React)
    const backendURL =
      'http://localhost/portfolio/backend_php/contact_submit.php'

    const response = await axios.post(backendURL, formData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: false, // pastikan tidak kirim cookie cross-origin
      timeout: 10000,
    })

    if (response?.data?.status === 'success') {
      Swal.close()
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
      })

      // Reset form
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      })
    } else {
      throw new Error(response?.data?.message || 'Unknown server error')
    }
  } catch (err) {
    Swal.close()

    // Tampilkan pesan error yang lebih jelas di console
    console.error('❌ PHP backend error:', err)

    // Jika error karena CORS, tampilkan penjelasan
    if (err.message.includes('Network Error')) {
      Swal.fire({
        title: 'Network Error!',
        text: 'Failed to reach the backend. Please ensure your PHP server is running and CORS is enabled.',
        icon: 'error',
      })
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to send message. Please try again later.',
        icon: 'error',
      })
    }
  }
}
