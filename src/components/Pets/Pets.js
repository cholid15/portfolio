import { pets } from '../../portfolio'
import './Pets.css'

const Pets = () => {
  if (!pets.length) return null

  return (
    <section id='pets' className='section pets'>
      <div className='pets__header'>
        <h2 className='section__title'>My Love Pets</h2>
        <p className='pets__subtitle'>Meet my adorable feline family</p>
      </div>

      <div className='pets__grid'>
        {pets.map((pet) => (
          <div key={pet.id} className='pet__card'>
            <div className='pet__avatar'>
              <img
                src={pet.photo}
                alt={pet.name}
                className='pet__image'
                onError={(e) => {
                  e.target.src =
                    'https://via.placeholder.com/150/4f46e5/ffffff?text=🐱'
                }}
              />
            </div>
            <h3 className='pet__name'>{pet.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Pets
