import { header } from '../../portfolio'
import Navbar from '../Navbar/Navbar'
import './Header.css'

const Header = () => {
  const { homepage, title } = header

  const handleHeaderClick = () => {
    const activeLinks = document.querySelectorAll('.link--nav.active')
    activeLinks.forEach((link) => {
      link.classList.remove('active')
    })
  }

  return (
    <header className='header center'>
      <h3>
        {homepage ? (
          <a href='/' className='linkheader' onClick={handleHeaderClick}>
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <Navbar />
    </header>
  )
}

export default Header
