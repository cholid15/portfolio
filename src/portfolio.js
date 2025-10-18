const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: '#',
  // title: 'Kholid Industries',
  title: 'Kholid Works',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Kholid Fajar Supardi',
  role: 'a Full Stack Developer',
  // picture:
  //   'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
  picture: 'a.jpeg',

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
    id: 'https://drive.google.com/file/d/1BYy832wjW6wiVWGjAS5jEI6WZuHQwBl4/view?usp=sharing',
    en: 'https://drive.google.com/file/d/1TmAsiB_7mbEtVE3hfG18QExWP9pivy_N/view?usp=drive_link',
  },
}

const projects = [
  // projects can be added an removed
  // if there are no projects, Projects section won't show up
  {
    name: 'Sistem Buku Tamu YBWSA',
    description:
      'Sistem Buku Tamu YBWSA - Aplikasi web untuk manajemen tamu yang memungkinkan pencatatan, pelacakan, dan pelaporan kunjungan tamu secara efisien, dilengkapi dengan fitur jadwal sholat dan ayat alquran harian.',
    stack: ['Laravel 11', 'PHP', 'MySQL', 'Laravel Breeze'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    image: 'bukutamu_laravel.jpg',
  },
  {
    name: 'Sistem Buku Tamu YBWSA',
    description:
      'Sistem Buku Tamu YBWSA - versi awal yang dikembangkan menggunakan CodeIgniter 4',
    stack: ['CodeIgniter 4', 'PHP', 'Mysql', 'CodeIgniter Shield'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    image: 'bukutamu_ci.jpg',
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

const pets = [
  {
    id: 1,
    name: 'Luna',
    breed: 'Persian',
    age: '2 years',
    favoriteFood: 'Salmon',
    personality: 'Playful & Affectionate',
    photo: '/images/luna.jpg',
    color: 'White',
    funFact: 'Loves chasing laser pointers',
  },
  {
    id: 2,
    name: 'Milo',
    breed: 'Maine Coon',
    age: '3 years',
    favoriteFood: 'Tuna',
    personality: 'Gentle Giant',
    photo: '/images/milo.jpg',
    color: 'Brown Tabby',
    funFact: 'Enjoys watching birds from window',
  },
  {
    id: 3,
    name: 'Bella',
    breed: 'Siamese',
    age: '1.5 years',
    favoriteFood: 'Chicken',
    personality: 'Vocal & Curious',
    photo: '/images/bella.jpg',
    color: 'Seal Point',
    funFact: 'Always greets me at the door',
  },
  {
    id: 4,
    name: 'Charlie',
    breed: 'Bengal',
    age: '2 years',
    favoriteFood: 'Duck',
    personality: 'Energetic & Athletic',
    photo: '/images/charlie.jpg',
    color: 'Spotted Rosette',
    funFact: 'Can jump to incredible heights',
  },
  {
    id: 5,
    name: 'Daisy',
    breed: 'Ragdoll',
    age: '4 years',
    favoriteFood: 'Turkey',
    personality: 'Calm & Loving',
    photo: '/images/daisy.jpg',
    color: 'Blue Bicolor',
    funFact: 'Goes limp when you pick her up',
  },
  {
    id: 6,
    name: 'Oliver',
    breed: 'British Shorthair',
    age: '5 years',
    favoriteFood: 'Beef',
    personality: 'Independent & Sweet',
    photo: '/images/oliver.jpg',
    color: 'Blue',
    funFact: 'Has a signature grumpy face',
  },
  {
    id: 7,
    name: 'Coco',
    breed: 'Sphynx',
    age: '2.5 years',
    favoriteFood: 'Lamb',
    personality: 'Attention Seeker',
    photo: '/images/coco.jpg',
    color: 'Pinkish Skin',
    funFact: 'Loves wearing sweaters',
  },
]

export { header, about, projects, skills, contact, pets }
