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

  // 🧩 Typing Effect States
  const [displayText, setDisplayText] = useState('')
  const [loopIndex, setLoopIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(120)

  // ✨ Kata-kata tambahan setelah role utama
  const roles = [
    role,
    'a dreamer',
    'wanted to be a gamer but ended up being...',
    role,
  ]

  // ⚙️ Efek Typing
  useEffect(() => {
    const current = roles[loopIndex % roles.length]
    const fullText = `${current}.`

    let timer
    if (isDeleting) {
      setTypingSpeed(50)
      timer = setTimeout(() => {
        setDisplayText((prev) => fullText.substring(0, prev.length - 1))
      }, typingSpeed)
    } else {
      setTypingSpeed(120)
      timer = setTimeout(() => {
        setDisplayText((prev) => fullText.substring(0, prev.length + 1))
      }, typingSpeed)
    }

    if (!isDeleting && displayText === fullText) {
      setTimeout(() => setIsDeleting(true), 1200)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setLoopIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, loopIndex])

  const toggleDropdown = (event) => {
    // Hentikan propagasi event agar tidak langsung memicu handleClickOutside
    if (event) {
      event.stopPropagation()
    }
    setIsDropdownOpen(!isDropdownOpen)
  }

  // ❌ Tutup dropdown saat klik di luar area (DIPERBAIKI)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Cek apakah klik dilakukan di luar dropdown resume
      if (!event.target.closest('.resume-dropdown')) {
        setIsDropdownOpen(false)
      }
    }

    // Gunakan event 'click' instead of 'mousedown' untuk behavior yang lebih baik
    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // 🔢 Animasi Counter Stats
  useEffect(() => {
    const counters = document.querySelectorAll('.about__stat-number')
    const speed = 8000

    counters.forEach((counterEl) => {
      const el = counterEl
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
                  }/images/biodata/${picture}`
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

          {/* 🎯 Efek Typing, tanpa ubah struktur */}
          {role && <h2 className='about__role'>{displayText}</h2>}

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
        </div>
      )}
    </div>
  )
}

export default About
