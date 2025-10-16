import uniqid from 'uniqid'
import Slider from 'react-slick'
import { useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { projects } from '../../portfolio'
import ProjectContainer from '../ProjectContainer/ProjectContainer'
import './Projects.css'

const Projects = () => {
  if (!projects.length) return null

  const [currentSlide, setCurrentSlide] = useState(0)

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  }

  return (
    <section id='projects' className='section projects'>
      <h2 className='section__title'>
        Projects{' '}
        <span className='projects__count'>
          ({currentSlide + 1} / {projects.length})
        </span>
      </h2>

      <div className='projects__carousel'>
        <Slider
          dots={settings.dots}
          infinite={settings.infinite}
          speed={settings.speed}
          slidesToShow={settings.slidesToShow}
          slidesToScroll={settings.slidesToScroll}
          autoplay={settings.autoplay}
          autoplaySpeed={settings.autoplaySpeed}
          pauseOnHover={settings.pauseOnHover}
          arrows={settings.arrows}
          responsive={settings.responsive}
          beforeChange={settings.beforeChange}
        >
          {projects.map((project) => (
            <div key={uniqid()} className='project__slide'>
              <ProjectContainer project={project} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Projects
