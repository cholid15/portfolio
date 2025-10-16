const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: '#',
  // title: 'Kholid Industries',
  title: 'Kholid Works',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Kholid Fajar Supardi',
  role: 'Full Stack Developer',
  picture:
    'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',

  description:
    'I am a passionate Full Stack Developer with experience in building web applications using modern technologies. I love to learn and explore new technologies to enhance my skills and deliver high-quality solutions.',
  // resume: 'https://example.com',
  social: {
    linkedin: 'https://www.linkedin.com/in/cholidfajar/',
    github: 'https://github.com/cholid15',
    instagram: 'https://www.instagram.com/khalidfjr_/',
    wa: 'https://wa.me/6282353361496',
  },
  // Tambahkan stats baru di sini
  stats: {
    yearsOfExperience: 2,
    projectsCompleted: 6,
    masteredTechnologies: 25,
    clientCollaboration: 8,
  },

  resume: {
    id: 'https://yourwebsite.com/resume-id.pdf',
    en: 'https://yourwebsite.com/resume-en.pdf',
  },
}

const projects = [
  // projects can be added an removed
  // if there are no projects, Projects section won't show up
  {
    name: 'Project 1',
    description:
      'Amet asperiores et impedit aliquam consectetur? Voluptates sed a nulla ipsa officia et esse aliquam',
    stack: ['SASS', 'TypeScript', 'React'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    image: 'cleanfolio.png',
  },
  {
    name: 'Project 2',
    description:
      'Amet asperiores et impedit aliquam consectetur? Voluptates sed a nulla ipsa officia et esse aliquam',
    stack: ['SASS', 'TypeScript', 'React'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    image:
      'https://github.githubassets.com/assets/GitHub-Logo-ee398b662d42.png',
  },
  {
    name: 'Project 3',
    description:
      'Amet asperiores et impedit aliquam consectetur? Voluptates sed a nulla ipsa officia et esse aliquam',
    stack: ['SASS', 'TypeScript', 'React'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
  },
  {
    name: 'Project 4',
    description:
      'Amet asperiores et impedit aliquam consectetur? Voluptates sed a nulla ipsa officia et esse aliquam',
    stack: ['SASS', 'TypeScript', 'React'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
  },
]

const skills = [
  // Languages
  'HTML',
  'JavaScript',
  'PHP',
  'Python',

  // Styling & UI
  'CSS',
  'SASS',
  'Bootstrap',
  'Material UI',

  // Databases
  'MySQL',
  'PostgreSQL',

  // Frontend Frameworks & Libraries
  'Vue',
  'jQuery',
  'Node.js',

  // Backend Frameworks & Extensions
  'Laravel',
  'Laravel Breeze',
  'Laravel Spatie',
  'CodeIgniter 3 & 4',
  'CodeIgniter Shield',
  'Yii2',

  // API Development
  'RESTful API',
  'JSON',
  'Postman',
  'Axios',

  // Tools
  'Git',
  'GitHub',
]

const contact = {
  email: 'cholidfajar15@gmail.com',
  phone: '(+62) 823 5336 1496',
  address: 'Semarang City, Central Java, Indonesia',
  whatsapp: '(+62) 823 5336 1496', // optional
}

export { header, about, projects, skills, contact }
