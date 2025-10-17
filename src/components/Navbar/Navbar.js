import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import { ThemeContext } from '../../contexts/theme'
import { projects, skills, contact } from '../../portfolio'
import './Navbar.css'

const Navbar = () => {
  const [{ themeName, toggleTheme }] = useContext(ThemeContext)
  const [showNavList, setShowNavList] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const toggleNavList = () => setShowNavList(!showNavList)

  const handleNavClick = (section) => {
    setActiveSection(section)
    toggleNavList()
  }

  return (
    <nav className='center nav'>
      <ul
        style={{ display: showNavList ? 'flex' : null }}
        className='nav__list'
      >
        <li className='nav__list-item'>
          <Link
            to='/'
            onClick={() => handleNavClick('home')}
            className={`link link--nav ${
              activeSection === 'home' ? 'active' : ''
            }`}
          >
            Home
          </Link>
        </li>

        {projects.length ? (
          <li className='nav__list-item'>
            <Link
              to='/projects'
              onClick={() => handleNavClick('projects')}
              className={`link link--nav ${
                activeSection === 'projects' ? 'active' : ''
              }`}
            >
              Projects
            </Link>
          </li>
        ) : null}

        {skills.length ? (
          <li className='nav__list-item'>
            <Link
              to='/skills'
              onClick={() => handleNavClick('skills')}
              className={`link link--nav ${
                activeSection === 'skills' ? 'active' : ''
              }`}
            >
              Skills
            </Link>
          </li>
        ) : null}

        {contact.email ? (
          <li className='nav__list-item'>
            <Link
              to='/contact'
              onClick={() => handleNavClick('contact')}
              className={`link link--nav ${
                activeSection === 'contact' ? 'active' : ''
              }`}
            >
              Contact
            </Link>
          </li>
        ) : null}

        {/* INI SUDAH ADA PETS DI DALAM UL */}
        {/* {pets.length ? (
          <li className='nav__list-item'>
            <Link
              to='/pets'
              onClick={() => handleNavClick('pets')}
              className={`link link--nav ${
                activeSection === 'pets' ? 'active' : ''
              }`}
            >
              Pets
            </Link>
          </li>
        ) : null} */}
      </ul>

      <button
        type='button'
        onClick={toggleTheme}
        className='btn btn--icon nav__theme'
        aria-label='toggle theme'
      >
        {themeName === 'dark' ? <WbSunnyRoundedIcon /> : <Brightness2Icon />}
      </button>

      <button
        type='button'
        onClick={toggleNavList}
        className='btn btn--icon nav__hamburger'
        aria-label='toggle navigation'
      >
        {showNavList ? <CloseIcon /> : <MenuIcon />}
      </button>
    </nav>
  )
}

export default Navbar
