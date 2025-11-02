import { useState, useRef, useEffect } from 'react'
import EmailIcon from '@material-ui/icons/Email'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import { validateForm, handleSubmitLogic } from './ContactLogic'
import { contact } from '../../portfolio'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  // REF untuk memastikan komponen masih mounted
  const isMountedRef = useRef(true)
  useEffect(
    () => () => {
      isMountedRef.current = false
    },
    []
  )

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSubmitLogic(formData, setFormData, validateForm, isMountedRef)
  }

  return (
    <section className='contact-section' id='contact'>
      <div className='contact-container'>
        {/* LEFT SIDE */}
        <div className='contact-left'>
          <h2 className='contact-title'>Use me, don&apos;t hesitate!</h2>

          <p className='contact-description'>
            Let&apos;s collaborate and bring your ideas to life! Whether you
            need a modern website, a powerful API integration, or a full-stack
            solution, I&apos;m ready to work with you to make it happen.
            Together, we can build something amazing!
          </p>

          <form className='contact-form' onSubmit={handleSubmit}>
            <div className='form-row'>
              <input
                name='firstname'
                type='text'
                placeholder='Firstname'
                value={formData.firstname}
                onChange={handleChange}
                required
              />
              <input
                name='lastname'
                type='text'
                placeholder='Lastname'
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-row'>
              <input
                name='email'
                type='email'
                placeholder='Email address'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                name='phone'
                type='text'
                placeholder='Phone number'
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className='form-row'>
              <select
                name='service'
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value=''>Select a service</option>
                <option>Website Development</option>
                <option>API Integration</option>
              </select>
            </div>

            <textarea
              name='message'
              placeholder='Type your message here'
              rows='6'
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type='submit' className='btn-send'>
              Send
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className='contact-right'>
          <div className='contact-info'>
            <div className='info-item'>
              <div className='icon'>
                <PhoneIcon />
              </div>
              <div className='info-body'>
                <p className='info-label'>Phone</p>
                <p className='info-text'>{contact.phone}</p>
              </div>
            </div>
            <div className='info-item'>
              <div className='icon'>
                <EmailIcon />
              </div>
              <div className='info-body'>
                <p className='info-label'>Email</p>
                <p className='info-text'>{contact.email}</p>
              </div>
            </div>
            <div className='info-item'>
              <div className='icon'>
                <LocationOnIcon />
              </div>
              <div className='info-body'>
                <p className='info-label'>Address</p>
                <p className='info-text'>{contact.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
