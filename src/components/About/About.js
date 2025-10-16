import { useEffect, useState } from 'react'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import InstagramIcon from '@material-ui/icons/Instagram'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'

import { about } from '../../portfolio'
import './About.css'
import './AboutName.css'

const About = () => {
  const { name, role, description, resume, social, picture, stats } = about
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.resume-dropdown')) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const counters = document.querySelectorAll('.about__stat-number')
    const speed = 8000

    counters.forEach((counterEl) => {
      const el = counterEl // buat salinan referensi agar tidak dianggap mutate param
      const animate = () => {
        const targetValue = +el.getAttribute('data-target')
        const currentValue = +el.innerText
        const increment = targetValue / speed

        if (currentValue < targetValue) {
          el.innerText = Math.ceil(currentValue + increment)
          setTimeout(animate, 100)
        } else {
          el.innerText = targetValue
        }
      }

      animate()
    })
  }, [stats])

  return (
    <div className='about center'>
      <div className='about__header'>
        {picture && (
          <img
            src={
              picture.startsWith('http')
                ? picture
                : `${
                    typeof process !== 'undefined' ? process.env.PUBLIC_URL : ''
                  }/images/${picture}`
            }
            alt={name}
            className='about__picture'
          />
        )}

        <div className='about__intro'>
          {name && (
            <h1>
              <span className='about__name' id='aboutName'>
                {' '}
                Hi, I am {name}.
              </span>
            </h1>
          )}

          {role && <h2 className='about__role'> {role}.</h2>}
          <p className='about__desc'>{description && description}</p>
        </div>
      </div>

      <div className='about__contact center'>
        {resume && (
          <div className='resume-dropdown'>
            <button
              type='button'
              className='btn btn--outline'
              onClick={toggleDropdown}
            >
              Resume ▾
            </button>
            <div
              className={`resume-dropdown__menu ${
                isDropdownOpen ? 'resume-dropdown__menu--open' : ''
              }`}
            >
              <a href={resume.id} target='_blank' rel='noreferrer'>
                Bahasa Indonesia
              </a>
              <a href={resume.en} target='_blank' rel='noreferrer'>
                English
              </a>
            </div>
          </div>
        )}

        {social && (
          <>
            {social.github && (
              <a
                href={social.github}
                aria-label='github'
                className='link link--icon'
                target='_blank'
                rel='noopener noreferrer'
              >
                <GitHubIcon />
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                aria-label='linkedin'
                className='link link--icon'
                target='_blank'
                rel='noopener noreferrer'
              >
                <LinkedInIcon />
              </a>
            )}

            {social.instagram && (
              <a
                href={social.instagram}
                aria-label='instagram'
                className='link link--icon'
                target='_blank'
                rel='noopener noreferrer'
              >
                <InstagramIcon />
              </a>
            )}

            {social.wa && (
              <a
                href={social.wa}
                aria-label='whatsapp'
                className='link link--icon'
                target='_blank'
                rel='noopener noreferrer'
              >
                <WhatsAppIcon />
              </a>
            )}
          </>
        )}
      </div>

      {/* 🔥 Stats Section */}
      {stats && (
        <div className='about__stats'>
          <div className='about__stat'>
            <span
              className='about__stat-number'
              data-target={stats.yearsOfExperience}
            >
              0
            </span>
            <span className='about__stat-label'>Years of Experience</span>
          </div>
          <div className='about__stat'>
            <span
              className='about__stat-number'
              data-target={stats.projectsCompleted}
            >
              0
            </span>
            <span className='about__stat-label'>Projects Completed</span>
          </div>
          <div className='about__stat'>
            <span
              className='about__stat-number'
              data-target={stats.masteredTechnologies}
            >
              0
            </span>
            <span className='about__stat-label'>Mastered Technologies</span>
          </div>
          {/* <div className='about__stat'>
            <span
              className='about__stat-number'
              data-target={stats.masteredTechnologies}
            >
              0
            </span>
            <span className='about__stat-label'>Client Collaboration</span>
          </div> */}
        </div>
      )}
    </div>
  )
}

export default About
