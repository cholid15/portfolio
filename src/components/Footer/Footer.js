import { GitHub, LinkedIn, Instagram, WhatsApp } from '@material-ui/icons'
import './Footer.css'
import { about } from '../../portfolio'

const Footer = () => {
  const { social } = about

  return (
    <footer className='footer'>
      <div className='footer__social'>
        {social.github && (
          <a
            href={social.github}
            aria-label='GitHub'
            className='footer__link'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GitHub />
          </a>
        )}

        {social.linkedin && (
          <a
            href={social.linkedin}
            aria-label='LinkedIn'
            className='footer__link'
            target='_blank'
            rel='noopener noreferrer'
          >
            <LinkedIn />
          </a>
        )}

        {social.instagram && (
          <a
            href={social.instagram}
            aria-label='Instagram'
            className='footer__link'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Instagram />
          </a>
        )}

        {social.wa && (
          <a
            href={social.wa}
            aria-label='WhatsApp'
            className='footer__link'
            target='_blank'
            rel='noopener noreferrer'
          >
            <WhatsApp />
          </a>
        )}
      </div>
      <p className='footer__text'>
        © {new Date().getFullYear()} Kholid Fajar Supardi • KholidWorks
      </p>
    </footer>
  )
}

export default Footer
