// import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import LocationOnIcon from '@material-ui/icons/LocationOn'
// import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import PhoneIcon from '@material-ui/icons/Phone'
import { contact } from '../../portfolio'
import './Contact.css'

const Contact = () => (
  <section className='contact-section' id='contact'>
    <div className='contact-container'>
      {/* LEFT SIDE */}
      <div className='contact-left'>
        {/* <h2 className='contact-title'>Let&apos;s work together</h2> */}
        <h2 className='contact-title'>Use me, don&apos;t hesitate!</h2>

        <p className='contact-description'>
          Let&apos;s collaborate and bring your ideas to life! Whether you need
          a website, API integration, IoT solutions, or DevOps services,
          I&apos;m here to help. Feel free to reach out, and let&apos;s build
          something amazing together!
        </p>

        <form className='contact-form' onSubmit={(e) => e.preventDefault()}>
          <div className='form-row'>
            <input type='text' placeholder='Firstname' required />
            <input type='text' placeholder='Lastname' required />
          </div>

          <div className='form-row'>
            <input type='email' placeholder='Email address' required />
            <input type='text' placeholder='Phone number' />
          </div>

          <div className='form-row'>
            <select aria-label='Select service'>
              <option>Select a service</option>
              <option>Website Development</option>
              <option>API Integration</option>
              <option>IoT Solutions</option>
              <option>DevOps Services</option>
            </select>
          </div>

          <textarea placeholder='Type your message here' rows='6' />

          <button type='submit' className='btn-send'>
            Send
          </button>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className='contact-right'>
        <div className='contact-info'>
          <div className='info-item'>
            <div className='icon' aria-hidden>
              <PhoneIcon />
            </div>
            <div className='info-body'>
              <p className='info-label'>Phone</p>
              <p className='info-text'>{contact.phone}</p>
            </div>
          </div>

          <div className='info-item'>
            <div className='icon' aria-hidden>
              <EmailIcon />
            </div>
            <div className='info-body'>
              <p className='info-label'>Email</p>
              <p className='info-text'>{contact.email}</p>
            </div>
          </div>

          <div className='info-item'>
            <div className='icon' aria-hidden>
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

export default Contact
