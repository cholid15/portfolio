import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './TestimonyView.css'

const TestimonyView = () => {
  const [testimonies, setTestimonies] = useState([])
  const [loading, setLoading] = useState(true)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  // Deteksi window width saat mount dan resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fetch testimonies
  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      try {
        const res = await fetch(
          'http://localhost/portfolio/backend_php/testimony_get.php'
        )
        const data = await res.json()
        if (!mounted) return
        setTestimonies(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Error fetching testimonies:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchData()
    return () => {
      mounted = false
    }
  }, [])

  // Tentukan slidesToShow berdasarkan window width
  const getInitialSlidesToShow = () => {
    if (windowWidth <= 480) return 1
    if (windowWidth <= 640) return 1
    if (windowWidth <= 768) return 2
    if (windowWidth <= 1024) return 2
    return 3
  }

  // ⚙️ Konfigurasi Slider dengan Responsive Settings
  const sliderSettings = {
    dots: testimonies.length > 1,
    infinite: testimonies.length > 1,
    speed: 600,
    slidesToShow: getInitialSlidesToShow(),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    // arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  if (loading) {
    return (
      <section
        className='section testimony-view section-spacing'
        id='testimony'
      >
        <h2 className='section__title'>What People Say</h2>
        <div className='testimony__loading'>Loading testimonies...</div>
      </section>
    )
  }

  return (
    <section className='section testimony-view section-spacing' id='testimony'>
      <h2 className='section__title'>
        What People Say{' '}
        <span className='testimony__count'>
          ({testimonies.length} testimonial{testimonies.length > 1 ? 's' : ''})
        </span>
      </h2>

      <div className='testimony-carousel'>
        <Slider
          dots={sliderSettings.dots}
          infinite={sliderSettings.infinite}
          speed={sliderSettings.speed}
          slidesToShow={sliderSettings.slidesToShow}
          slidesToScroll={sliderSettings.slidesToScroll}
          autoplay={sliderSettings.autoplay}
          autoplaySpeed={sliderSettings.autoplaySpeed}
          pauseOnHover={sliderSettings.pauseOnHover}
          arrows={sliderSettings.arrows}
          nextArrow={sliderSettings.nextArrow}
          prevArrow={sliderSettings.prevArrow}
          responsive={sliderSettings.responsive}
          className='testimony-slider'
        >
          {testimonies.map((item) => (
            <div key={item.id || item.email} className='testimony-slide'>
              <article className='testimony-card'>
                <header className='testimony-card__header'>
                  <div className='testimony-avatar'>
                    {item.name ? item.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div className='testimony-meta'>
                    <div className='testimony-name'>{item.name}</div>
                    <div className='testimony-email'>{item.email}</div>
                  </div>
                </header>

                <div className='testimony-message'>
                  &ldquo;{item.message}&rdquo;
                </div>

                <footer className='testimony-card__footer'>
                  <div className='testimony-rating'>
                    {'★'.repeat(item.rating || 0)}
                    {'☆'.repeat(5 - (item.rating || 0))}
                  </div>
                  <div className='testimony-date'>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString()
                      : ''}
                  </div>
                </footer>
              </article>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default TestimonyView
