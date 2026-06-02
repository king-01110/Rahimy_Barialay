import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type Language = 'en' | 'ps'

const dictionary = {
  en: {
    navAbout: 'About',
    navSkills: 'Skills',
    navExperience: 'Experience',
    navProjects: 'Projects',
    navHire: 'Hire Me',
    navBlog: 'Blog',
    navContact: 'Contact',
    heroBadge: 'Building premium enterprise-grade software',
    heroRole: 'Senior Full Stack Software Engineer',
    heroTitle: 'Building Modern Web Applications That Solve Real Business Problems',
    heroTyping1: 'Enterprise Software Engineer',
    heroTyping2: 'API & Backend Architect',
    heroTyping3: 'Modern Frontend Specialist',
    heroSubtitle:
      'Senior Full Stack Software Engineer with 4+ years delivering scalable enterprise products.',
    ctaResume: 'Download Resume',
    ctaContact: 'Contact',
    ctaWork: 'View Work',
    about: 'About Me',
    aboutBody:
      'Passionate Full Stack Software Engineer with over 4 years of experience designing, building, and deploying scalable web systems including MIS, ERP, government platforms, dashboards, and automation software. I focus on product clarity, maintainable architecture, and measurable business outcomes. Education: Kabul University.',
    skillsTitle: 'Skills',
    experienceTitle: 'Experience Timeline',
    projectsTitle: 'Featured Projects',
    filterAll: 'All',
    filterGovernment: 'Government',
    filterBusiness: 'Business',
    hireTitle: 'Available for Hire',
    hireHeadline: 'Open for freelance and contract opportunities',
    hireBody:
      'Building high-impact web platforms, enterprise systems, dashboards, and business automation products for teams that value quality and speed.',
    achievementsTitle: 'Achievements & Statistics',
    testimonialsTitle: 'Testimonials',
    contactTitle: 'Contact',
    contactName: 'Name',
    contactEmail: 'Email',
    contactMessage: 'Message',
    contactSend: 'Send Message',
    blogBack: 'Back to portfolio',
    blogTitle: 'Insights & Articles',
    blogPost1Title: 'Designing Scalable MIS Systems',
    blogPost1Excerpt:
      'Practical architectural decisions for modular and maintainable management information systems.',
    blogPost2Title: 'API Patterns for Enterprise Products',
    blogPost2Excerpt:
      'A look into robust REST/GraphQL patterns, validation, versioning, and performance strategies.',
    blogPost3Title: 'From Idea to Deployment',
    blogPost3Excerpt:
      'How to move from product requirements to production-grade release with CI/CD discipline.',
  },
  ps: {
    navAbout: 'زما په اړه',
    navSkills: 'مهارتونه',
    navExperience: 'تجربه',
    navProjects: 'پروژې',
    navHire: 'د کار لپاره',
    navBlog: 'بلاګ',
    navContact: 'اړیکه',
    heroBadge: 'د تصدۍ کچې لوړ کیفیت سافټویر جوړونه',
    heroRole: 'لوړ پوړی فول سټک سافټویر انجنیر',
    heroTitle: 'د عصري ویب غوښتنلیکونو جوړول چې د سوداګرۍ واقعي ستونزې حلوي',
    heroTyping1: 'د تصدۍ سافټویر انجنیر',
    heroTyping2: 'د API او بیکنډ معمار',
    heroTyping3: 'د عصري فرنټنډ متخصص',
    heroSubtitle:
      'لوړ پوړی فول سټک انجنیر د ۴+ کلونو تجربې سره چې سترې سافټویر حل لارې وړاندې کوي.',
    ctaResume: 'رزومه ډاونلوډ کړئ',
    ctaContact: 'اړیکه ونیسئ',
    ctaWork: 'کارونه وګورئ',
    about: 'زما په اړه',
    aboutBody:
      'زه یو لیواله فول سټک سافټویر انجنیر یم چې له ۴ کلونو زیات مسلکي تجربه لرم. ما MIS، ERP، دولتي سیستمونه، ډشبورډونه او د سوداګرۍ اتومات حل لارې ډیزاین، جوړ او تطبیق کړي دي. زما تمرکز پر روښانه محصول، پایداره معمارۍ او اندازه کېدونکو پایلو دی. زده کړې: کابل پوهنتون.',
    skillsTitle: 'مهارتونه',
    experienceTitle: 'د تجربې مهالویش',
    projectsTitle: 'مهمې پروژې',
    filterAll: 'ټولې',
    filterGovernment: 'دولت',
    filterBusiness: 'سوداګریز',
    hireTitle: 'د کار لپاره چمتو',
    hireHeadline: 'د فری لانس او قراردادي کارونو لپاره موجود',
    hireBody:
      'د هغو ټیمونو لپاره لوړ اغېز لرونکي ویب پلیټفارمونه، تصدۍ سیستمونه، ډشبورډونه او د سوداګرۍ اتومات حل لارې جوړوم چې کیفیت او سرعت ته ارزښت ورکوي.',
    achievementsTitle: 'لاسته راوړنې او احصایې',
    testimonialsTitle: 'سپارښتنې',
    contactTitle: 'اړیکه',
    contactName: 'نوم',
    contactEmail: 'ایمیل',
    contactMessage: 'پیغام',
    contactSend: 'پیغام واستوئ',
    blogBack: 'بېرته پورټفولیو ته',
    blogTitle: 'مسلکي لیدلوري او مقالې',
    blogPost1Title: 'د مقیاس وړ MIS سیستمونو ډیزاین',
    blogPost1Excerpt:
      'د ماډیولر او پایداره مدیریت معلوماتي سیستمونو لپاره عملي معماري پرېکړې.',
    blogPost2Title: 'د تصدۍ محصولاتو لپاره API نمونې',
    blogPost2Excerpt:
      'پیاوړي REST/GraphQL نمونې، اعتبار سنجي، نسخه بندي او د کړنې ښه کولو ستراتیژۍ.',
    blogPost3Title: 'له نظره تر تطبیقه',
    blogPost3Excerpt:
      'څنګه د محصول اړتیاوې د CI/CD د منظم بهیر له لارې تولیدي خپرونې ته ورسوو.',
  },
}

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof (typeof dictionary)['en']) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: keyof (typeof dictionary)['en']) => dictionary[language][key],
    }),
    [language],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
