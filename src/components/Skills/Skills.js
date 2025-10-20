import uniqid from 'uniqid'
import { skills } from '../../portfolio'
import './Skills.css'

const Skills = () => {
  if (!skills.length) return null

  // Group skills by kategori
  const skillCategories = {
    'Programming Languages': ['HTML', 'JavaScript', 'PHP', 'Python'],
    'Frontend Frameworks': ['Vue', 'jQuery', 'Bootstrap', 'Material UI'],
    'Backend Frameworks': ['Laravel', 'CodeIgniter 3 & 4', 'Yii2', 'Node.js'],
    'Styling & CSS': ['CSS', 'SASS'],
    Database: ['MySQL', 'PostgreSQL'],
    'API Development': ['RESTful API', 'JSON', 'Postman', 'Axios'],
    'Tools & Libraries': [
      'Git',
      'GitHub',
      'Laravel Breeze',
      'Laravel Spatie',
      'CodeIgniter Shield',
    ],
  }

  return (
    <section className='section skills' id='skills'>
      <h2 className='section__title'>Skills</h2>

      <div className='skills__categories'>
        {Object.entries(skillCategories).map(([category, categorySkills]) => (
          <div key={uniqid()} className='skills__category'>
            <h3 className='skills__category-title'>{category}</h3>
            <ul className='skills__list'>
              {categorySkills.map((skill) => (
                <li key={uniqid()} className='skills__list-item btn btn--plain'>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
