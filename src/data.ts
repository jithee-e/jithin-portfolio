import { Project, Skill, EducationEntry, ContactInfo, Certificate, ExperienceEntry } from './types';

// Import image assets directly so that Vite bundles and hashes them correctly in production
import medcoreClinicImg from './assets/images/medcore_clinic_1781445232075.jpg';
import luxeSalonImg from './assets/images/regenerated_image_1781447915126.png';
import designPortfolioImg from './assets/images/design_portfolio_1781445262585.jpg';
import caseStudyScreensImg from './assets/images/case_study_screens_1781445292289.jpg';

export const projectsData: Project[] = [
  {
    id: 'medcore',
    title: 'MedCore Clinic',
    subtitle: 'Premium Medical & Wellness Digital Presence',
    description: 'A high-conversion digital presence engineered with immediate trust triggers (ISO/Accreditation badges) and a simplified visual structure for a premium, multi-disciplinary clinic.',
    category: 'Creative Web Design',
    image: medcoreClinicImg,
    tags: ['UI/UX Design', 'Figma', 'Clinical Excellence System', 'Conversion Boosters', 'Auto Layout 5.0'],
    role: 'Lead UI/UX Designer',
    year: '2026',
    client: 'MedCore Health Clinic',
    deliverables: ['12-Column Responsive Layout', 'Clinical Excellence System Palette', 'Distraction-Free Consultation Form', 'Sticky "Book Appointment" Bar'],
    metrics: 'Engineered immediate trust lifts via hero fold accreditation anchors and streamlined 3-step modern patient booking.',
    githubLink: 'https://lnkd.in/gQiiSGgb',
    screens: [
      'Accreditation Hero Fold & Trust anchors',
      'Distraction-free Consultation Booking Form',
      'Digestible Clinical Specialties Grid',
      'Responsive Sticky Booking Header'
    ],
    process: [
      {
        step: '01',
        title: 'Empathize & Solve',
        description: 'Identified that cold clinical layouts and jargon-filled pages create doctor booking anxiety. Solved by replacing dated layouts with immediate trust anchors like ISO badges.'
      },
      {
        step: '02',
        title: 'Cognitive De-cluttering',
        description: 'Eradicated dense service panels. Categorized complex diagnostics, general, pediatric, and specialty care options into a streamlined, high-contrast visual list.'
      },
      {
        step: '03',
        title: 'Clinical Grid System',
        description: 'Engineered a robust, pixel-perfect 12-column grid in Figma utilizing Auto Layout 5.0, unified Manrope headers, and legible Inter body pairings.'
      },
      {
        step: '04',
        title: 'Figma Component Systems',
        description: 'Structured responsive components using design system tokens, interactive variant styles, custom vectors, and a sticky navigation action bar.'
      }
    ]
  },
  {
    id: 'luxe-salon',
    title: 'Luxe Salon & Spa',
    subtitle: 'Mobile Appointment Booking System UI',
    description: 'A high-fidelity mobile boutique experience translating premium, tactile physical spa aesthetics into a sleek mobile ecosystem with an editorial layout, progressive disclosure, and integrated loyalty rewards.',
    category: 'Mobile Application',
    image: luxeSalonImg,
    tags: ['Mobile UI', 'Figma', 'Editorial Layout', 'Progressive Disclosure', 'Loyalty Rewards'],
    role: 'Lead Product Designer',
    year: '2025',
    client: 'Luxe Wellness Group',
    deliverables: ['Editorial UI & Design System', 'Contextual Home Dashboard', 'Segmented Scheduling Matrix', 'Glassmorphic Loyalty Profile'],
    metrics: 'Eliminated booking friction points while bridging the digital-to-physical luxury transition seamlessly.',
    githubLink: 'https://lnkd.in/gQWqSv6R',
    screens: [
      'Contextual Home Dashboard & Booking Hero',
      'Artisan Portfolio Stylist Tier Matrix',
      'Segmented Morning/Afternoon/Evening Scheduling Matrix',
      'Glassmorphic Loyalty Profile & QR Code'
    ],
    process: [
      {
        step: '01',
        title: 'Solving Transactional Chill',
        description: 'Translated the warm, gorgeous, tactile atmosphere of physical high-end boutiques into a luxury champagne-and-charcoal digital identity (#F7E7CE, #1A1A1A).'
      },
      {
        step: '02',
        title: 'Progressive Disclosure Path',
        description: 'Designed a smooth reservation flow with progressive details to alleviate cognitive overload and keep high-end users focus-locked without drop-offs.'
      },
      {
        step: '03',
        title: 'Removing Booking Uncertainty',
        description: 'Created upfront Starting Investment price markers and comprehensive Service Details to foster immediate customer trust.'
      },
      {
        step: '04',
        title: 'Digital-to-Physical QR Integration',
        description: 'Added a beautiful home-screen Fast Check-In QR Code and localized salon-chair map routes to eliminate awkward front-desk arrivals.'
      }
    ]
  },
  {
    id: 'portfolio',
    title: 'Design Booklet',
    subtitle: 'Personal Portfolio Design',
    description: 'An editorial, publication-style personal portfolio website inspired by luxury magazines and architectural brochures. Maximizes white space, oversized typography, and deep cobalt-blue accents.',
    category: 'Creative Web Design',
    image: designPortfolioImg,
    tags: ['Portfolio UI', 'Editorial Layout', 'Tailwind CSS', 'Framer Motion'],
    role: 'UI/UX Designer',
    year: '2026',
    client: 'Self-Initiated',
    deliverables: ['Custom Typography Framework', 'Aesthetic Motion Design', 'Interactive Booklet Layout'],
    metrics: 'Built for high performance with pristine visual hierarchy that is completely responsive across screen configurations.',
    process: [
      {
        step: '01',
        title: 'Design Archetype Definition',
        description: 'Moved away from standard tech resume templates. Drew structural cues from high-end Swiss design magazines, focusing on grid asymmetry, massive typographic titles, and bold accent lines.'
      },
      {
        step: '02',
        title: 'Motion Choreography',
        description: 'Engineered delightful, booklet-style slide-outs and 3D tilts inside the project cards to represent a designer’s perspective on touch and depth.'
      }
    ]
  },
  {
    id: 'case-study',
    title: 'Case Study Archives',
    subtitle: 'MedCore & Luxe Salon Design Rationales',
    description: 'A deeply organized repository indexing exhaustive design rationales, target user archetypes, responsive layout grids, progressive booking flows, digital-to-physical bridges, and behavioral conversion optimization frameworks for elite healthcare and beauty platforms.',
    category: 'Product Strategy & UX Research',
    image: caseStudyScreensImg,
    tags: ['Figma UX Decisions', 'User Persona Sheets', 'CRO Strategies', 'Design Systems'],
    role: 'Lead UX Researcher & Planner',
    year: '2026',
    client: 'Design Rationale Repository',
    deliverables: [
      'MedCore Care Seeker & Intervention Personas',
      'Clinical Excellence 12-Column Desktop Grid',
      'Hero Fold ISO Certification Trust Anchors',
      'Bento Layout Service Router Blueprints',
      'CRO Persistent Sticky Mobile Booking Bar',
      'Luxe progressive 5-step Reservation Model',
      'Luxe Luxury Palette & Typography Tokens',
      'Glassmorphic Loyalty QR Arrival Experience'
    ],
    process: [
      {
        step: '01',
        title: 'MedCore Clinic Patient Archetypes',
        description: 'Differentiated Proactive Care Seekers (prioritizing long-term wellness, family schedules, and quick credential validation) from Specialized Intervention Patients (prioritizing clinical authority, exact technical specifications, and fast turnaround to reduce medical anxiety).'
      },
      {
        step: '02',
        title: 'MedCore 12-Column Layout Grid',
        description: 'Structured interfaces on a rigid 12-column desktop (1440px) and a 4-column responsive mobile grid (390px) backed by an 8px baseline grid. Solved choice paralysis via a Bento layout routing panel and high-contrast dark conversion boundaries.'
      },
      {
        step: '03',
        title: 'MedCore Cognitive Reduction & CRO',
        description: 'Sought optimal readability with a Manrope/Inter pairing. Reduced cognitive load using benefit-driven microcopy (e.g. Same-Day Results) and stylized micro-cards. Maximized conversions via persistent sticky mobile CTA bars and value assurances.'
      },
      {
        step: '04',
        title: 'Luxe Salon & Spa Target Demographics',
        description: 'Targeted high-end clientele requiring streamlined speed (Busy Professionals), modern editorial aesthetics and Luxe Points tracking (Tech-Savvy Consumers), and comprehensive, transparent pricing to prevent hesitation (Detail-Oriented Clients).'
      },
      {
        step: '05',
        title: 'Luxe Progressive 5-Step Logic',
        description: 'Laid out booking logic with a progressive disclosure model: 1. Discovery (Rituals & visits dashboard), 2. Education (Treatment details & duration), 3. Stylist Curation (Tiers & specialties), 4. Horizontal Calendaring, and 5. Direction-mapped confirmation.'
      },
      {
        step: '06',
        title: 'Luxe Luxury Brand Tokens & Components',
        description: 'Paired Playfair Display headings with Inter labels inside a champagne-and-charcoal color palette (#F7E7CE, #1A1A1A). Leveraged translucent glassmorphism for member check-in QR codes, keeping vertical viewports clear via horizontal elements.'
      }
    ]
  }
];

export const skillsData: Skill[] = [
  // UI/UX Design & Core UX Design
  { name: 'UI/UX Design', level: 95, category: 'core' },
  { name: 'Figma', level: 98, category: 'tools' },
  { name: 'Adobe XD', level: 90, category: 'tools' },
  { name: 'Wireframing', level: 95, category: 'core' },
  { name: 'Prototyping', level: 95, category: 'core' },
  { name: 'User-Centered Design', level: 94, category: 'core' },
  { name: 'User Research', level: 88, category: 'core' },
  
  // Dev & Technical
  { name: 'HTML5', level: 85, category: 'tools' },
  { name: 'CSS3', level: 88, category: 'tools' },
  { name: 'Tailwind CSS', level: 85, category: 'tools' },
  { name: 'MS Word', level: 90, category: 'tools' },
  { name: 'MS Excel', level: 80, category: 'tools' },
  { name: 'PowerPoint', level: 92, category: 'tools' },
  
  // Professional / Soft Skills
  { name: 'Communication', level: 95, category: 'soft' },
  { name: 'Teamwork', level: 95, category: 'soft' },
  { name: 'Leadership', level: 88, category: 'soft' },
  { name: 'Problem Solving', level: 92, category: 'soft' }
];

export const educationData: EducationEntry[] = [
  {
    degree: 'UI/UX Design Diploma (6 Months)',
    institution: 'Avodha Edutech',
    location: 'Kerala, India',
    period: '2025 - 2026',
    details: 'In-depth specialization in professional digital interface design, design sprints, customer validation research, user flows, and wireframing best practices.'
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Srinivas University',
    location: 'Mangalore, Karnataka',
    period: '2023 - 2026',
    details: 'Rigorous foundation in computer science principles, web technologies, software planning, application development architectures, and database structures.'
  }
];

export const experienceData: ExperienceEntry[] = [
  {
    role: 'UI/UX Design Intern',
    company: 'NATechsys Intelligent Systems Pvt. Ltd.',
    location: 'Kerala, India',
    period: '2026',
    duration: '3 Months',
    details: 'Leveraged user research, comprehensive wireflows, and standardized component libraries in Figma to design modern web workflows and enterprise dashboard proposals.',
    highlights: [
      'Interactive Design Systems: Standardized robust component libraries, interactive design system tokens, and Auto Layout 5.0 variants in Figma.',
      'Heuristic Assessments: Identified and mitigated application friction points, maximizing usability scores under standard criteria.',
      'Dynamic Prototyping: Formulated low-fidelity wireframes and progressive disclosure high-fidelity models for specialized interface systems.',
      'Cross-Team Sync: Partnered with software developers and stakeholders to execute pixel-perfect, accessible layout transitions.'
    ]
  }
];

export const certificatesData: Certificate[] = [
  {
    title: 'Introduction to UX/UI Design',
    issuer: 'IBM',
    link: 'https://www.coursera.org/account/accomplishments/verify/3YMD9YYYJ0TE?utm_source=android&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course',
    issueDate: 'Coursera Verified',
    credentialId: '3YMD9YYYJ0TE',
    skills: ['User Experience', 'User Interface Design', 'Heuristic Evaluation', 'Information Architecture'],
    description: 'Comprehensive introduction to professional design paradigms, understanding user intent, accessibility guidelines, and structural design systems as established by IBM’s user experience teams.'
  },
  {
    title: 'Product Design and UX/UI Fundamentals',
    issuer: 'XBOX',
    link: 'https://www.coursera.org/account/accomplishments/verify/C1WSQH0DOA4D?utm_source=android&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course',
    issueDate: 'Coursera Verified',
    credentialId: 'C1WSQH0DOA4D',
    skills: ['Product Frameworks', 'UX Research', 'Figma Prototyping', 'Gaming & Interactive UI'],
    description: 'Advanced study of product strategies, modern multi-screen paradigms, cognitive load reduction, and user interaction mechanics tailored for interactive visual workspaces and immersive branding systems.'
  },
  {
    title: 'Product Design',
    issuer: 'Bournemouth University & Springpod',
    link: 'https://space.springpod.com/certificate/z6bdl48e19g3/share',
    issueDate: 'Bournemouth Masterclass',
    credentialId: 'z6bdl48e19g3',
    skills: ['Product Engineering', 'Materiality & Aesthetics', 'Physical Interfaces', 'Anthropometrics'],
    description: 'Specialized design masterclass with Dr. Bryce Dyer. Explores material selection constraints, anthropometrics, human-centered physical interfaces, and industrial aesthetics.'
  }
];

export const contactInfo: ContactInfo = {
  email: 'jithinrajan092@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jithin-rajann',
  github: 'https://github.com/jithee-e',
  location: 'Kasaragod, Kerala'
};
