import { useEffect, useRef, useState } from 'react'
import './TestimonyView.css'

const TestimonyView = () => {
  const [testimonies, setTestimonies] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  const autoRef = useRef(null)

  // Fetch testimonies dari backend
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
        if (!mounted) return
        // fallback demo
        setTestimonies([
          {
            id: 1,
            name: 'Ahmad Fauzi',
            email: 'ahmad@example.com',
            message: 'Website-nya cepat dan tampilannya keren banget!',
            rating: 5,
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            name: 'Siti Rahma',
            email: 'siti@example.com',
            message: 'Desainnya clean dan responsif di semua device.',
            rating: 4,
            created_at: new Date().toISOString(),
          },
          {
            id: 3,
            name: 'Rizky Putra',
            email: 'rizky@example.com',
            message: 'Fast response dan hasil project sangat memuaskan!',
            rating: 5,
            created_at: new Date().toISOString(),
          },
        ])
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchData()
    return () => {
      mounted = false
    }
  }, [])

  // helper: slides-per-view
  const getSlidesPerView = () => {
    if (typeof window === 'undefined') return 1
    const w = window.innerWidth
    if (w >= 1024) return 3
    if (w >= 768) return 2
    return 1
  }

  // Scroll ke index (dipakai oleh tombol/dots)
  const scrollToIndex = (index) => {
    const container = containerRef.current
    if (!container) return
    const slides = container.querySelectorAll('.testimony-card')
    if (!slides.length) return
    const spv = getSlidesPerView()
    const maxIndex = Math.max(0, testimonies.length - spv)
    const clamped = Math.max(0, Math.min(index, maxIndex))
    const target = slides[clamped]
    if (target) {
      container.scrollTo({
        left: target.offsetLeft,
        behavior: 'smooth',
      })
      setActiveIndex(clamped)
    }
  }

  const handlePrev = () => scrollToIndex(activeIndex - 1)
  const handleNext = () => scrollToIndex(activeIndex + 1)

  // Update activeIndex saat scroll manual (dependensi: testimonies)
  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      // selalu kembalikan fungsi cleanup untuk konsistensi lint
      return () => {}
    }

    const onScroll = () => {
      const slides = container.querySelectorAll('.testimony-card')
      if (!slides.length) return
      let closest = 0
      let minDiff = Infinity
      slides.forEach((s, i) => {
        const diff = Math.abs(s.offsetLeft - container.scrollLeft)
        if (diff < minDiff) {
          minDiff = diff
          closest = i
        }
      })
      setActiveIndex(closest)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    // cleanup
    return () => {
      container.removeEventListener('scroll', onScroll)
    }
  }, [testimonies])

  // Autoplay (selalu mengembalikan cleanup function)
  useEffect(() => {
    if (!testimonies.length) {
      return () => {}
    }

    const tick = () => {
      const container = containerRef.current
      if (!container) return
      const spv = getSlidesPerView()
      const slides = container.querySelectorAll('.testimony-card')
      if (!slides.length) return
      const maxIndex = Math.max(0, slides.length - spv)
      const next = activeIndex >= maxIndex ? 0 : activeIndex + 1
      const target = slides[next]
      if (target) {
        container.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
        setActiveIndex(next)
      }
    }

    autoRef.current = setInterval(tick, 4000)
    return () => {
      clearInterval(autoRef.current)
    }
  }, [activeIndex, testimonies])

  // Re-align on resize (selalu mengembalikan cleanup)
  useEffect(() => {
    const onResize = () => {
      const container = containerRef.current
      if (!container) return
      const slides = container.querySelectorAll('.testimony-card')
      if (!slides.length) return
      const idx = Math.min(
        activeIndex,
        Math.max(0, slides.length - getSlidesPerView())
      )
      const target = slides[idx]
      if (target) {
        container.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
        setActiveIndex(idx)
      }
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [activeIndex, testimonies])

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
      <h2 className='section__title'>What People Say</h2>

      <div className='testimony-carousel-wrap'>
        <button
          type='button'
          className='carousel-btn carousel-btn--prev'
          onClick={handlePrev}
          aria-label='Previous testimony'
        >
          ‹
        </button>

        <div className='testimony-carousel' ref={containerRef}>
          {testimonies.length > 0 ? (
            testimonies.map((item) => (
              <article className='testimony-card' key={item.id || item.email}>
                <header className='testimony-card__header'>
                  <div className='testimony-avatar'>
                    {item.name ? item.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div className='testimony-meta'>
                    <div className='testimony-name'>{item.name}</div>
                    <div className='testimony-email'>{item.email}</div>
                  </div>
                </header>

                <div className='testimony-message'>“{item.message}”</div>

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
            ))
          ) : (
            <div className='testimony-empty'>No testimonies yet.</div>
          )}
        </div>

        <button
          type='button'
          className='carousel-btn carousel-btn--next'
          onClick={handleNext}
          aria-label='Next testimony'
        >
          ›
        </button>
      </div>

      <div
        className='testimony-dots'
        role='tablist'
        aria-label='Testimony pages'
      >
        {Array.from(
          {
            length: Math.max(1, testimonies.length - (getSlidesPerView() - 1)),
          },
          (_, i) => (
            <button
              key={i}
              type='button'
              className={`dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => {
                const container = containerRef.current
                if (!container) return
                const slides = container.querySelectorAll('.testimony-card')
                const target = slides[i]
                if (target) {
                  container.scrollTo({
                    left: target.offsetLeft,
                    behavior: 'smooth',
                  })
                  setActiveIndex(i)
                }
              }}
              aria-label={`Go to slide ${i + 1}`}
              role='tab'
              aria-selected={i === activeIndex}
            />
          )
        )}
      </div>
    </section>
  )
}

export default TestimonyView
