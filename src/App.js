import { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeContext } from './contexts/theme'
import Header from './components/Header/Header'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import './App.css'

// Komponen untuk halaman utama (home)
const HomePage = () => (
  <>
    <About />
    {/* <div className='section-spacing'>
      <Projects />
    </div> */}
    {/* <div className='section-spacing'>
      <Skills />
    </div> */}
  </>
)

const ProjectsPage = () => (
  <div className='section-spacing'>
    <Projects />
  </div>
)

const SkillsPage = () => (
  <div className='section-spacing'>
    <Skills />
  </div>
)

// Komponen untuk halaman contact
const ContactPage = () => (
  <div className='section-spacing'>
    <Contact />
  </div>
)

const App = () => {
  const [{ themeName }] = useContext(ThemeContext)

  return (
    <Router>
      <div id='top' className={`${themeName} app`}>
        <Header />

        <main>
          <Switch>
            {/* Route untuk halaman utama */}
            <Route exact path='/'>
              <HomePage />
            </Route>

            {/* Route untuk halaman Projects */}
            <Route path='/projects'>
              <ProjectsPage />
            </Route>

            {/* Route untuk halaman Skills */}
            <Route path='/skills'>
              <SkillsPage />
            </Route>

            {/* Route untuk halaman contact */}
            <Route path='/contact'>
              <ContactPage />
            </Route>
          </Switch>
        </main>

        <ScrollToTop />
        <Footer />
      </div>
    </Router>
  )
}

export default App
