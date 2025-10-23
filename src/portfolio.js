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
    name: 'Sistem Buku Tamu YBWSA 1',
    description:
      'Buku Tamu Digital YBWSA adalah aplikasi berbasis web yang berfungsi untuk mencatat dan mengelola data kunjungan tamu secara digital di lingkungan Yayasan Badan Wakaf Sultan Agung (YBWSA). Aplikasi ini menggantikan proses manual buku tamu menjadi sistem otomatis, efisien, dan mudah diakses melalui browser.',
    stack: [
      'Boostrap5',
      'CodeIgniter 4',
      'PHP',
      'JavaScript',
      'Jquery',
      'Mysql',
      'CodeIgniter Shield',
    ],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    image: '/projects/bukutamu1.png',
  },

  {
    name: 'Sistem Buku Tamu YBWSA',
    description:
      'Sistem Buku Tamu YBWSA - Aplikasi web untuk manajemen tamu yang memungkinkan pencatatan, pelacakan, dan pelaporan kunjungan tamu secara efisien, dilengkapi dengan fitur jadwal sholat dan ayat alquran harian.',
    stack: [
      'Boostrap5',
      'Laravel 11',
      'PHP',
      'JavaScript',
      'Jquery',
      'MySQL',
      'Laravel Breeze',
    ],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    image: '/projects/bukutamu2.png',
  },

  {
    name: 'Satu Data YBWSA',
    description:
      'Sistem Satu Data adalah platform terintegrasi yang mengelola dan menampilkan data dari seluruh unit di bawah naungan Yayasan Badan Sultan Agung. Sistem ini mencakup data dari berbagai lembaga seperti Rumah Sakit Sultan Agung, unit pendidikan (Dikdasmen), dan Universitas Islam Sultan Agung. Informasi yang dihimpun meliputi data pegawai, dosen, guru, mahasiswa, siswa, serta data aset tanah wakaf yang dikelola oleh Lazis Sultan Agung.',
    stack: [
      'Boostrap5',
      'CodeIgniter 4',
      'PHP',
      'JavaScript',
      'Jquery',
      'Mysql',
      'CodeIgniter Shield',
    ],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    image: '/projects/satudata.png',
  },
  {
    name: 'SDI(Sumber Daya Insani) YBWSA',
    description:
      'SDI (Sumber Daya Insani) YBWSA adalah sistem monitoring dan manajemen data kepegawaian di lingkungan Yayasan Badan Wakaf Sultan Agung. Sistem ini digunakan oleh bagian SDI/HRD untuk menambah data pegawai, memperbarui riwayat jabatan, serta mengelola informasi kepegawaian lainnya. Selain itu, sistem ini juga memfasilitasi pengajuan karier oleh unit-unit di bawah yayasan untuk proses kenaikan golongan atau pangkat pegawai.',
    stack: [
      'Boostrap5',
      'CodeIgniter 4',
      'PHP',
      'JavaScript',
      'Jquery',
      'Mysql',
      'CodeIgniter Shield',
    ],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    image: '/projects/sdi.png',
  },
  {
    name: 'Si Surat YBWSA',
    description:
      'Si Surat YBWSA adalah sistem surat-menyurat digital yang dikembangkan untuk Sekretariat Yayasan Badan Wakaf Sultan Agung. Sistem ini memfasilitasi proses disposisi dan pelacakan riwayat surat dari seluruh unit di bawah yayasan ke sekretariat, sehingga mempermudah administrasi surat-menyurat. Dilengkapi dengan fitur diskusi berupa chat group, sistem ini memungkinkan pembahasan surat sebelum disposisi, finalisasi, dan tindak lanjut dilakukan, sekaligus mendukung terwujudnya proses kerja yang efisien dan paperless.',
    stack: [
      'Boostrap5',
      'CodeIgniter 4',
      'PHP',
      'JavaScript',
      'Jquery',
      'Mysql',
      'CodeIgniter Shield',
    ],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    image: '/projects/sisurat.png',
  },
  {
    name: 'SPMB (Sistem Penerimaan Murid Baru)',
    description:
      'SPMB (Sistem Penerimaan Murid Baru) adalah sistem yang dikembangkan untuk mempermudah proses penerimaan peserta didik baru di sekolah-sekolah di bawah naungan Dikdasmen (Pendidikan Dasar dan Menengah) Yayasan Badan Wakaf Sultan Agung. Sistem ini mendukung proses pendaftaran secara online maupun offline, sehingga memudahkan sekolah dalam mengelola data calon murid, seleksi, dan administrasi penerimaan secara lebih efisien dan terintegrasi.',
    stack: [
      'Boostrap5',
      'CodeIgniter 4',
      'PHP',
      'JavaScript',
      'Jquery',
      'Mysql',
      'CodeIgniter Shield',
    ],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
    image: '/projects/spmb.png',
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
