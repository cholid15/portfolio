/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react'
import axios from 'axios'
import './Testimony.css'

const Testimony = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    message: '',
    rating: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // URL backend dari .env frontend - DIPERBAIKI
  const API_BASE_URL =
    process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
  const TESTIMONY_URL = `${API_BASE_URL}/testimony`

  const validate = () => {
    const tempErrors = {}
    if (!formData.name.trim()) tempErrors.name = 'Name is required.'
    if (!formData.role.trim()) tempErrors.role = 'Role or position is required.'
    if (!formData.company.trim())
      tempErrors.company = 'Company or project name is required.'
    if (!formData.message.trim())
      tempErrors.message = 'Please write your testimony.'
    if (!formData.rating) tempErrors.rating = 'Please select a rating.'
    return tempErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' })
    setSubmitError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    setSubmitError('')

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log('Sending data to:', TESTIMONY_URL) // Debug log
        console.log('Data:', formData) // Debug log
        console.log('API Base URL:', API_BASE_URL) // Debug log

        const res = await axios.post(TESTIMONY_URL, formData)
        console.log('✅ Testimony submitted:', res.data)
        setIsSubmitted(true)

        setFormData({
          name: '',
          role: '',
          company: '',
          message: '',
          rating: '',
        })

        setTimeout(() => setIsSubmitted(false), 3000)
      } catch (error) {
        console.error('❌ Failed to submit testimony:', error)
        console.error('Error details:', error.response?.data)

        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          'Failed to send testimony. Please check backend connection.'
        setSubmitError(`❌ ${errorMessage}`)
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
        <div className='testimony__group'>
          <label htmlFor='testi-name'>Full Name</label>
          <input
            id='testi-name'
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='John Doe'
          />
          {errors.name && <p className='error'>{errors.name}</p>}
        </div>

        <div className='testimony__group'>
          <label htmlFor='testi-role'>Role / Position</label>
          <input
            id='testi-role'
            type='text'
            name='role'
            value={formData.role}
            onChange={handleChange}
            placeholder='e.g. Frontend Developer'
          />
          {errors.role && <p className='error'>{errors.role}</p>}
        </div>

        <div className='testimony__group'>
          <label htmlFor='testi-company'>Company / Project</label>
          <input
            id='testi-company'
            type='text'
            name='company'
            value={formData.company}
            onChange={handleChange}
            placeholder='e.g. Kholid Industries'
          />
          {errors.company && <p className='error'>{errors.company}</p>}
        </div>

        <div className='testimony__group'>
          <label htmlFor='testi-message'>Your Testimony</label>
          <textarea
            id='testi-message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            placeholder='Write something meaningful...'
            rows='4'
          />
          {errors.message && <p className='error'>{errors.message}</p>}
        </div>

        <div className='testimony__group'>
          <label htmlFor='testi-rating'>Rating</label>
          <select
            id='testi-rating'
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

        <button type='submit' className='testimony__btn'>
          Submit Testimony
        </button>

        {isSubmitted && (
          <p className='success'>
            🎉 Thank you! Your testimony has been submitted.
          </p>
        )}

        {submitError && (
          <p
            className='error'
            style={{ marginTop: '10px', textAlign: 'center' }}
          >
            {submitError}
          </p>
        )}
      </form>
    </div>
  )
}

export default Testimony
