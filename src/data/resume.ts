// Single source of truth for all resume content rendered on the site.
// Edit text here — components only handle layout and motion.

export const profile = {
  name: 'Fadhil Parmata',
  firstName: 'Fadhil',
  lastName: 'Parmata',
  role: 'Software Engineer',
  location: 'Riau, Indonesia',
  email: 'fadhilprmt@gmail.com',
  phone: '+62 851-5639-6190',
  whatsapp: 'https://wa.me/6285156396190',
  linkedin: 'https://www.linkedin.com/in/fadhil-parmata-2599a0310',
  cv: '/CV_FadhilParmata.pdf',
  current: 'Software Engineer at IATMI',
  tagline:
    'Full-stack engineer who ships end-to-end — from requirements and system design to production servers — across web, data, and AI.',
  disciplines: ['Full-stack', 'AI / ML', 'Data & BI', 'UI / UX'],
}

export const stats = [
  { value: 3.94, decimals: 2, suffix: '', label: 'CGPA out of 4.00', note: 'Bachelor of Information System' },
  { value: 100, decimals: 0, suffix: '%', label: 'Intern records digitised', note: 'At Pertamina RU II Dumai' },
  { value: 83.72, decimals: 2, suffix: '', label: 'System Usability Scale', note: 'Raised from 78.7 in 3 iterations' },
  { value: 20, decimals: 0, suffix: '+', label: 'Tenant teams on my Expo platform', note: 'Rp 5M+ live transactions' },
]

export type Experience = {
  company: string
  short: string
  role: string
  period: string
  context?: string
  points: string[]
  stack: string[]
  link?: { label: string; href: string }
}

export const experience: Experience[] = [
  {
    company: 'IATMI — Ikatan Ahli Teknik Perminyakan Indonesia',
    short: 'IATMI',
    role: 'Software Engineer',
    period: 'Jul 2026 — Present',
    context: 'Professional association of Indonesian petroleum engineering experts',
    points: [
      'Gathered requirements across divisions and mapped business flows to redesign the website UX for Simposium IATMI XVIII 2026, a national petroleum engineering symposium.',
      'Managed and troubleshot production infrastructure independently: mail server, web server, and CI/CD pipeline.',
      'Delivered the full-stack implementation with React on the front end and Node.js/Express on the back end.',
    ],
    stack: ['React', 'Node.js', 'Express', 'CI/CD', 'Linux'],
  },
  {
    company: 'Politeknik Caltex Riau',
    short: 'PCR',
    role: 'Software Engineer',
    period: 'Mar 2026 — Jun 2026',
    points: [
      'Architected and delivered a production multi-role academic recognition system serving 5 distinct user roles, each with tailored dashboards and workflows.',
      'Owned end-to-end delivery as sole developer: requirements, system design, full-stack implementation, deployment, and user documentation.',
      'Used an AI-augmented workflow (Claude Code, GitHub Copilot, Google Antigravity) to compress a multi-developer project into a solo build without sacrificing clean architecture.',
    ],
    stack: ['Full-stack', 'System Design', 'AI-assisted dev'],
    link: { label: 'rpl.pocari.id', href: 'https://rpl.pocari.id' },
  },
  {
    company: 'PT Kilang Pertamina Internasional RU II Dumai',
    short: 'Pertamina',
    role: 'Software Engineer Intern',
    period: 'Oct 2024 — Jan 2025',
    context: 'State-owned refinery — one of the largest in Indonesia',
    points: [
      'Architected and delivered the IT Internship Management System end-to-end with ASP.NET Core 8, digitising 100% of intern intake records.',
      "Applied Pertamina's proprietary clean-code architecture (Pertamina Solution Template) for a maintainable, production-grade codebase.",
      'Documented and handed over the system to the IT team — zero post-deployment support tickets.',
    ],
    stack: ['ASP.NET Core 8', 'C#', 'Clean Architecture'],
  },
  {
    company: 'Assist.id',
    short: 'Assist.id',
    role: 'Backend Engineer Intern',
    period: 'Jul 2021 — Nov 2021',
    context: 'Hospital Management Information System SaaS for healthcare facilities across Indonesia',
    points: [
      'Maintained and enhanced the official marketing website, improving reliability and content accuracy.',
      'Engineered a RESTful API for the upcoming mobile application on the MERN stack.',
    ],
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
  },
]

export type ProjectCategory = 'Full-stack' | 'AI / ML' | 'Data & BI' | 'Mobile & UI/UX'

export type Project = {
  title: string
  category: ProjectCategory
  period: string
  stack: string[]
  summary: string
  highlights: string[]
  metric?: string
  link?: { label: string; href: string }
}

export const projects: Project[] = [
  {
    title: 'Multimodal AI with Qwen2.5-VL',
    category: 'AI / ML',
    period: 'Sep — Dec 2025',
    stack: ['Python', 'Qwen2.5-VL-12B', 'PyTorch', 'Transformers', 'Gradio'],
    summary:
      'A locally deployed vision-language model app for image captioning and object localization through an interactive Gradio interface.',
    highlights: [
      'End-to-end inference pipeline: preprocessing, multimodal prompting, inference, visualization',
      'Evaluated captioning and natural-language object localization on local infrastructure',
    ],
    metric: '12B params, on-prem',
  },
  {
    title: 'Expo Technopreneurship Platform',
    category: 'Full-stack',
    period: 'Nov — Dec 2025',
    stack: ['Laravel', 'Vue.js', 'Tailwind CSS', 'MySQL', 'VPS'],
    summary:
      'Public-facing platform for the PCR Technopreneurship Expo — adopted as the official platform, reused year over year.',
    highlights: [
      'Sole developer from requirements to VPS hosting and live demo',
      'Used by 20+ tenant teams during the event',
    ],
    metric: 'Rp 5M+ live transactions',
  },
  {
    title: 'SPMI Quality Assurance Dashboard',
    category: 'Data & BI',
    period: 'Sep 2024 — Feb 2026',
    stack: ['Power BI', 'DAX', 'REST API', 'ETL'],
    summary:
      "Power BI dashboard for PCR's Internal Quality Assurance, fed by an ETL pipeline from the SPMI API and structured around the five PPEPP stages.",
    highlights: [
      'Three user-centered design iterations with stakeholders',
      'First-author paper published in TEKNOSI 12(2)',
    ],
    metric: 'SUS 78.7 → 83.72',
    link: { label: 'Read the paper', href: 'https://doi.org/10.25077/TEKNOSI.v12i2.2026.377-385' },
  },
  {
    title: 'Logbook Information System',
    category: 'Full-stack',
    period: 'Nov 2023 — Aug 2024',
    stack: ['Laravel', 'MySQL'],
    summary: 'Web-based laboratory logbook for PCR that replaced a fully manual paper process.',
    highlights: ['Requirements, ERD, full-stack build, user manual, and ongoing maintenance'],
    metric: 'Paper → digital',
  },
  {
    title: 'JTI Expo Website',
    category: 'Full-stack',
    period: 'Jun — Jul 2024',
    stack: ['Laravel', 'MySQL', 'VPS', 'cPanel'],
    summary:
      "Admin panel and product catalogue showcasing PCR's featured projects at the Riau Government Exhibition, used live at the provincial expo.",
    highlights: ['Self-hosted on a VPS — deployment and uptime managed independently'],
    metric: 'Live at provincial expo',
  },
  {
    title: 'MoJalan — Tour Guide Marketplace',
    category: 'Mobile & UI/UX',
    period: 'Apr — Jul 2024',
    stack: ['Figma', 'Kotlin', 'Android Studio'],
    summary: 'A platform connecting tourists with local tour guides — full UI/UX in Figma, implemented natively on Android.',
    highlights: ['Designed the complete UI/UX and built it in Android Studio'],
    metric: 'Design → native app',
  },
  {
    title: 'Fast Food Classification (CNN)',
    category: 'AI / ML',
    period: 'Apr — Jul 2024',
    stack: ['Python', 'TensorFlow', 'Keras', 'React'],
    summary: 'A convolutional neural network for fast-food image classification, deployed behind a React web interface.',
    highlights: ['Trained the CNN as a data mining project and shipped it for end users'],
    metric: 'Model → web app',
  },
]

export const achievements = [
  {
    title: 'First-author journal publication',
    org: 'TEKNOSI 12(2), 377–385',
    year: '2026',
    detail:
      'Development of a User-Centered Business Intelligence Dashboard to Support the PPEPP Quality Assurance Framework in Higher Education.',
    link: { label: 'doi:10.25077/TEKNOSI.v12i2.2026.377-385', href: 'https://doi.org/10.25077/TEKNOSI.v12i2.2026.377-385' },
  },
  {
    title: 'Trusted with lecturer & freelance projects',
    org: 'Lecturers and freelance clients',
    year: '2025',
    detail: 'Trusted to build projects commissioned by lecturers as well as freelance clients.',
  },
  {
    title: 'Hackfest 2024 — Google Developer Student Club',
    org: 'GDSC Hackathon',
    year: '2024',
    detail: 'Competed in a hackathon focused on the Sustainable Development Goals.',
  },
  {
    title: 'Beasiswa Prestasi Pemerintah Provinsi Riau',
    org: 'Riau Provincial Government',
    year: '2023',
    detail: 'Merit scholarship awarded to high-achieving students.',
  },
]

export const education = {
  school: 'Politeknik Caltex Riau',
  degree: 'Bachelor of Information System',
  period: 'Sep 2022 — Oct 2026',
  gpa: '3.94 / 4.00',
}

export const organizations = [
  {
    title: 'Head of Research & Technology (RISTEK)',
    org: 'HIMASISTIFO — Information System Student Association',
    period: 'Sep 2023 — Sep 2025',
    points: [
      'Led a 4-member department, authored the annual Research & Technology roadmap, and sat on the Steering Committee for HI-TECH 7, a national student tech competition.',
      'Earlier: spearheaded Weekend Belajar, a weekly tutoring programme for new students, and served as Chief Executive of HI-TECH 6.',
    ],
  },
  {
    title: 'PKM UI/UX Workshop Mentor',
    org: 'SMKN 7 & SMKS Muhammadiyah 2 Pekanbaru',
    period: 'Oct 2023 & May 2024',
    points: [
      'Mentored vocational high school students in fundamental UI design with Figma across two community outreach programmes, with individual feedback on assignments.',
    ],
  },
]

// `marquee: false` keeps a group in the grid but out of the scrolling ticker.
export const skills = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'PHP', 'Python', 'C#', 'Java', 'Kotlin', 'SQL', 'HTML/CSS'] },
  { group: 'Frameworks', items: ['React', 'Next.js', 'Vue.js', 'Node.js', 'Express', 'Laravel', 'CodeIgniter', 'ASP.NET Core 8', 'Android'] },
  { group: 'Tools & Platforms', items: ['Git/GitHub', 'Docker', 'VPS Deployment', 'Google Cloud', 'Figma', 'Postman', 'Power BI', 'Jupyter'] },
  { group: 'AI-assisted Development', items: ['Claude Code', 'GitHub Copilot', 'Antigravity', 'Codex'] },
  { group: 'Practices', items: ['Version Control', 'Debugging', 'UI/UX Principles', 'Design'], marquee: false },
  { group: 'Soft Skills', items: ['Fast Learner', 'Teamwork', 'Critical Thinking', 'Quick Adaptation', 'Problem Solving'], marquee: false },
]

export const spokenLanguages = ['Bahasa Indonesia — Native', 'English — Professional']
