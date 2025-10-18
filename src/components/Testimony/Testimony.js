/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import './Testimony.css'

const Testimony = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    rating: '',
  })

  const [errors, setErrors] = useState({})

  // ✅ Validasi input
  const validate = () => {
    const tempErrors = {}
    if (!formData.name.trim()) tempErrors.name = 'Name is required.'
    if (!formData.email.trim()) tempErrors.email = 'Email is required.'
    if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = 'Please enter a valid email.'
    if (!formData.message.trim()) tempErrors.message = 'Message is required.'
    if (!formData.rating) tempErrors.rating = 'Please select a rating.'
    return tempErrors
  }

  // ✅ Tangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      try {
        // 🔄 SweetAlert Loading
        Swal.fire({
          title: 'Sending your testimony...',
          text: 'Please wait a few seconds 😊',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          },
        })

        const PHP_URL =
          'http://localhost/portfolio/backend_php/testimony_submit.php'

        const res = await axios.post(PHP_URL, formData, {
          headers: { 'Content-Type': 'application/json' },
        })

        if (res.data.success) {
          Swal.fire({
            icon: 'success',
            title: '🎉 Testimony Submitted!',
            text: 'Thank you for sharing your feedback!',
            confirmButtonText: 'OK',
          })
          setFormData({
            name: '',
            email: '',
            company: '',
            message: '',
            rating: '',
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: '❌ Failed to Submit',
            text: res.data.message || 'Something went wrong.',
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '🚫 Error',
          text:
            error.response?.data?.message ||
            error.message ||
            'Could not send testimony.',
        })
      }
    }
  }

  return (
    <div className='testimony'>
      <h2 className='testimony__title'>💬 Share Your Testimony</h2>
      <p className='testimony__subtitle'>
        Your feedback inspires improvement — let us know your thoughts!
      </p>

      <form className='testimony__form' onSubmit={handleSubmit}>
        {/* Name */}
        <div className='testimony__group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter your name'
          />
          {errors.name && <p className='error'>{errors.name}</p>}
        </div>

        {/* Email */}
        <div className='testimony__group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your email'
          />
          {errors.email && <p className='error'>{errors.email}</p>}
        </div>

        {/* Company */}
        <div className='testimony__group'>
          <label htmlFor='company'>Company / Project</label>
          <input
            id='company'
            type='text'
            name='company'
            value={formData.company}
            onChange={handleChange}
            placeholder='Enter your company or project name'
          />
        </div>

        {/* Message */}
        <div className='testimony__group'>
          <label htmlFor='message'>Your Testimony</label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            rows='4'
            placeholder='Write something meaningful...'
          />
          {errors.message && <p className='error'>{errors.message}</p>}
        </div>

        {/* Rating */}
        <div className='testimony__group'>
          <label htmlFor='rating'>Rating</label>
          <select
            id='rating'
            name='rating'
            value={formData.rating}
            onChange={handleChange}
          >
            <option value=''>-- Select Rating --</option>
            <option value='5'>⭐⭐⭐⭐⭐ (Excellent)</option>
            <option value='4'>⭐⭐⭐⭐ (Good)</option>
            <option value='3'>⭐⭐⭐ (Average)</option>
            <option value='2'>⭐⭐ (Poor)</option>
            <option value='1'>⭐ (Very Bad)</option>
          </select>
          {errors.rating && <p className='error'>{errors.rating}</p>}
        </div>

        {/* Submit */}
        <button type='submit' className='testimony__btn'>
          Submit Testimony
        </button>
      </form>
    </div>
  )
}

export default Testimony
