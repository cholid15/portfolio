import './Footer.css'

const Footer = () => (
  <footer className='footer'>
    <p className='footer__text'>
      © {new Date().getFullYear()} <strong>KholidWorks</strong> • Crafted by
      Kholid Fajar Supardi
    </p>
  </footer>
)

export default Footer
