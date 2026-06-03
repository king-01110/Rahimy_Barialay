import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  FaArrowRight,
  FaAws,
  FaCode,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
  FaMoon,
  FaPhone,
  FaSun,
} from 'react-icons/fa'
import {
  SiApache,
  SiBootstrap,
  SiCss,
  SiDigitalocean,
  SiDocker,
  SiGit,
  SiGithub,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMaterialdesign,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiSharp,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import type { IconType } from 'react-icons'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { projects, skillCategories, stats } from '../data/portfolio'
import { useTheme } from '../providers/theme-provider'
import { useLanguage } from '../providers/language-provider'
import profilePhoto from '../assets/profile.jpeg'

const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const technologyIcons: Record<string, IconType> = {
  Laravel: SiLaravel,
  PHP: SiPhp,
  'ASP.NET Core': SiSharp,
  'Node.js': SiNodedotjs,
  'REST APIs': FaCode,
  GraphQL: SiGraphql,
  'React.js': SiReact,
  TypeScript: SiTypescript,
  'JavaScript (ES6+)': SiJavascript,
  HTML5: SiHtml5,
  CSS3: SiCss,
  'Tailwind CSS': SiTailwindcss,
  Bootstrap: SiBootstrap,
  'Material UI': SiMaterialdesign,
  'Next.js': SiNextdotjs,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  'SQL Server': SiSharp,
  SQLite: SiSqlite,
  AWS: FaAws,
  DigitalOcean: SiDigitalocean,
  Docker: SiDocker,
  'CI/CD': FaCode,
  Nginx: SiNginx,
  Apache: SiApache,
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
}

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(() => Math.round(count.get()))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(count, to, { duration: 1.6, ease: 'easeOut' })
    const unsubscribe = rounded.on('change', (latest) => setDisplay(latest))
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [count, rounded, to])

  return <span>{display.toLocaleString() + suffix}</span>
}

export function HomePage() {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const typePhrases = useMemo(
    () => [t('heroTyping1'), t('heroTyping2'), t('heroTyping3')],
    [t],
  )
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [activeProjectFilter, setActiveProjectFilter] = useState<'All' | 'Government' | 'Business'>('All')
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, { stiffness: 160, damping: 24 })
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -32])

  useEffect(() => {
    let phraseIndex = 0
    let charIndex = 0
    let deleting = false
    const timer = window.setInterval(() => {
      const currentPhrase = typePhrases[phraseIndex]
      if (!deleting) {
        charIndex += 1
        setTyped(currentPhrase.slice(0, charIndex))
        if (charIndex >= currentPhrase.length) {
          deleting = true
        }
      } else {
        charIndex -= 1
        setTyped(currentPhrase.slice(0, charIndex))
        if (charIndex <= 0) {
          deleting = false
          phraseIndex = (phraseIndex + 1) % typePhrases.length
        }
      }
    }, 95)
    return () => {
      window.clearInterval(timer)
    }
  }, [typePhrases])

  const testimonials = [
    {
      quote: 'Barialay delivered a robust MIS platform ahead of deadline.',
      company: 'Government Partner',
    },
    {
      quote: 'High quality architecture, clear communication, and strong ownership.',
      company: 'Enterprise Client',
    },
    {
      quote: 'Strong full stack leadership from architecture to deployment.',
      company: 'Digital Transformation Program',
    },
  ]

  const localizedStats =
    language === 'ps'
      ? [
          { ...stats[0], label: 'د تجربې کلونه' },
          { ...stats[1], label: 'بشپړې شوې پروژې' },
          { ...stats[2], label: 'خوښ پیرودونکي' },
          { ...stats[3], label: 'مسلکي ټکنالوژۍ' },
          { ...stats[4], label: 'د پراختیا ساعتونه' },
        ]
      : stats

  const localizedSkillCategories =
    language === 'ps'
      ? skillCategories.map((category) => ({
          ...category,
          title:
            category.title === 'Backend Development'
              ? 'بک اېنډ پراختیا'
              : category.title === 'Frontend Development'
                ? 'فرانټ اېنډ پراختیا'
                : 'ډیټابیس او ډیواپس',
        }))
      : skillCategories

  const localizedProjects =
    language === 'ps'
      ? projects.map((project) => ({
          ...project,
          name:
            project.name === 'Road Construction Management System'
              ? 'د سړک جوړونې مدیریتي سیستم'
              : project.name === 'School Management Information System'
                ? 'د ښوونځۍ مدیریتي معلوماتي سیستم'
                : project.name === 'Pharmacy Management System'
                  ? 'د درملتون مدیریتي سیستم'
                  : project.name === 'Human Resource Management System'
                    ? 'د بشري سرچینو مدیریتي سیستم'
                    : project.name === 'Vehicle Registration System'
                      ? 'د وسایطو د ثبت سیستم'
                      : 'د توکو مدیریت سیستم',
          description:
            project.name === 'Road Construction Management System'
              ? 'د پروژې پلان جوړونه، بودیجه، پرمختګ څارنه او اجرائیوي راپورونه.'
              : project.name === 'School Management Information System'
                ? 'د زده کوونکو مدیریت، سوبتیا(حاضري)، ازموینې او رول-محوره راپورونه.'
                : project.name === 'Pharmacy Management System'
                  ? 'د موجودۍ کنټرول، خرڅلاو، پېر او مالي تحلیلونه.'
                  : project.name === 'Human Resource Management System'
                    ? 'د کارکوونکو مدیریت، معاش، سوبتیا(حاضري) او رخصتۍ پروسې.'
                    : project.name === 'Vehicle Registration System'
                      ? 'د ثبت او تصدیق خوځښتونه له راپور ورکولو سره.'
                      : 'د سټاک کنټرول، د پېر پروسه، او د شتمنیو تعقیب.',
        }))
      : projects

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [testimonials.length])

  const navItems = useMemo(
    () => [
      { id: 'about', label: t('navAbout') },
      { id: 'skills', label: t('navSkills') },
      // { id: 'experience', label: t('navExperience') },
      { id: 'projects', label: t('navProjects') },
      { id: 'hire', label: t('navHire') },
      { id: 'contact', label: t('navContact') },
    ],
    [t],
  )

  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileNavOpen])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.2, 0.4, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [navItems])

  const filteredProjects =
    activeProjectFilter === 'All'
      ? localizedProjects
      : localizedProjects.filter((project) =>
          activeProjectFilter === 'Government'
            ? project.name.includes('Registration') || project.name.includes('Road')
            : !project.name.includes('Registration') && !project.name.includes('Road'),
        )

  return (
    <div
      dir={language === 'ps' ? 'rtl' : 'ltr'}
      className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f8fafc_45%,#eef2ff_100%)] text-slate-900 transition-colors dark:bg-[radial-gradient(circle_at_top,#111827_0%,#020617_45%,#0b1120_100%)] dark:text-slate-100"
    >
      <Helmet>
        <title>Barialay Rahimi | Senior Full Stack Software Engineer</title>
        <meta
          name="description"
          content="Premium portfolio of Barialay Rahimi, Senior Full Stack Software Engineer."
        />
        <meta name="keywords" content="Full Stack Engineer, Laravel, React, TypeScript, Afghanistan, Portfolio" />
      </Helmet>
      <motion.div
        className="fixed left-0 top-0 z-[80] h-1 w-full origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400"
        style={{ scaleX: progressScale }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl sm:h-72 sm:w-72 md:h-96 md:w-96 dark:bg-violet-500/25" />
        <div className="absolute left-4 top-80 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl sm:left-10 sm:h-56 sm:w-56 md:h-72 md:w-72 dark:bg-blue-500/20" />
        <div className="absolute bottom-10 right-4 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl sm:right-10 sm:h-64 sm:w-64 md:h-80 md:w-80 dark:bg-cyan-400/20" />
      </div>
      <header className="sticky top-0 z-50 px-2 pt-2 sm:px-4 lg:px-6">
        <div className="flex w-full min-w-0 items-center justify-between gap-2 rounded-2xl border border-slate-200/80 bg-white/70 px-3 py-2.5 shadow-lg shadow-slate-300/30 backdrop-blur-xl sm:gap-3 sm:px-4 sm:py-3 dark:border-white/10 dark:bg-slate-950/60 dark:shadow-slate-950/40 lg:px-6">
          <a href="#" className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-bold text-white sm:h-9 sm:w-9 sm:text-sm">
              BR
            </span>
            <span className="truncate text-sm font-semibold sm:text-base md:inline">
              Barialay Rahimi
            </span>
          </a>
          <nav className="hidden items-center gap-0.5 text-sm text-slate-600 md:flex lg:gap-1 dark:text-slate-300">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-2.5 py-1.5 transition-all lg:px-4 lg:py-2 ${
                  activeSection === item.id
                    ? 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300'
                    : 'hover:bg-slate-100 hover:text-cyan-700 dark:hover:bg-white/10 dark:hover:text-cyan-300'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-1.5 text-slate-700 sm:gap-2 md:gap-3 dark:text-slate-200">
            <button
              className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs sm:px-3 dark:border-white/20 dark:bg-transparent"
              onClick={() => setLanguage(language === 'en' ? 'ps' : 'en')}
            >
              {language.toUpperCase()}
            </button>
            <button
              className="rounded-full border border-slate-300 bg-white p-2 text-sm sm:text-base dark:border-white/20 dark:bg-transparent"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <button
              className="rounded-full border border-slate-300 bg-white p-2 text-sm sm:text-base md:hidden dark:border-white/20 dark:bg-transparent"
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isMobileNavOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        {isMobileNavOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 max-h-[min(70vh,24rem)] overflow-y-auto rounded-2xl border border-slate-200/80 bg-white/85 p-3 shadow-lg shadow-slate-300/30 backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-slate-950/80 dark:shadow-slate-950/40"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={`rounded-xl px-3 py-2 text-sm transition-all ${
                    activeSection === item.id
                      ? 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl space-y-10 px-3 py-8 sm:space-y-12 sm:px-5 sm:py-10 md:space-y-14 md:px-6 lg:px-10 xl:px-12 2xl:max-w-[90rem] 2xl:px-16">
        <section className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            className="order-2 min-w-0 lg:order-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [-8, 0] }}
            style={{ y: heroY }}
          >
            <span className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] text-cyan-700 sm:px-4 sm:text-xs dark:text-cyan-300">
              <FaCode className="shrink-0" /> {t('heroBadge')}
            </span>
            <p className="mt-2 text-sm text-cyan-600 sm:text-base dark:text-cyan-400">{t('heroRole')}</p>
            <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              {t('heroTitle')}
            </h1>
            <p className="mt-4 min-h-[1.5rem] text-sm text-cyan-600 sm:text-base dark:text-cyan-300">
              {typed}
              <span className="animate-pulse">|</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              {t('heroSubtitle')}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <a href={publicAsset('resume-barialay-rahimi.txt')} download className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">
                  <FaDownload className="mr-2 shrink-0" /> {t('ctaResume')}
                </Button>
              </a>
              <a href="#contact" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  <FaEnvelope className="mr-2 shrink-0" /> {t('ctaContact')}
                </Button>
              </a>
              <a href="#projects" className="w-full sm:w-auto">
                <Button variant="ghost" className="w-full sm:w-auto">
                  {t('ctaWork')} <FaArrowRight className="ml-2 shrink-0" />
                </Button>
              </a>
            </div>
            <div className="mt-6 flex gap-4 text-lg text-slate-600 sm:text-xl dark:text-slate-300">
              <a href="https://github.com" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ rotateX: 4, rotateY: -4 }}
            className="order-1 mx-auto w-full max-w-[280px] perspective-1000 sm:max-w-xs md:max-w-sm lg:order-2 lg:max-w-md"
          >
            <Card className="overflow-hidden border-cyan-400/20 p-0">
              <img
                src={profilePhoto}
                alt="Barialay Rahimi profile"
                className="aspect-[4/5] w-full object-cover object-top sm:aspect-[3/4]"
              />
            </Card>
          </motion.div>
        </section>

        <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {['4+ Years', '50+ Projects', '30+ Clients', '15+ Technologies'].map((kpi) => (
            <Card
              key={kpi}
              className="bg-cyan-50 py-3 text-center text-xs text-cyan-700 sm:py-4 sm:text-sm dark:bg-white/5 dark:text-cyan-300"
            >
              {kpi}
            </Card>
          ))}
        </section>

        <section id="about" className="scroll-mt-24">
          <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">{t('about')}</h2>
          <Card className="text-sm leading-7 sm:text-base">
            {t('aboutBody')}
          </Card>
        </section>

        <section id="skills" className="scroll-mt-24">
          <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">{t('skillsTitle')}</h2>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {localizedSkillCategories.map((category) => (
              <motion.div key={category.title} whileHover={{ y: -6 }}>
                <Card className="h-full">
                  <h3 className="mb-3 text-base font-semibold text-cyan-300 sm:text-lg">{category.title}</h3>
                  <ul className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
                    {category.items.map((item) => {
                      const Icon = technologyIcons[item] ?? FaCode
                      return (
                        <li
                          key={item}
                          className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs text-slate-700 sm:px-3 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                        >
                          <span className="shrink-0 rounded-md bg-cyan-100 p-1.5 text-cyan-700 dark:bg-white/10 dark:text-cyan-300">
                            <Icon />
                          </span>
                          <span className="min-w-0 break-words">{item}</span>
                        </li>
                      )
                    })}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience section — uncomment when ready
        <section id="experience">
          <h2 className="mb-6 text-2xl font-semibold">{t('experienceTitle')}</h2>
          <div className="relative space-y-4 before:absolute before:left-3 before:top-0 before:h-full before:w-px before:bg-cyan-400/30">
            <Card className="ml-8">
              <h3 className="font-semibold">
                {language === 'ps'
                  ? 'لوړ پوړی فول سټک انجنیر'
                  : 'Senior Full Stack Engineer'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {language === 'ps' ? '۲۰۲۴ - تر اوسه' : '2024 - Present'}
              </p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                {language === 'ps'
                  ? 'د معمارۍ مهمې پرېکړې، مقیاس وړ API ګانې او د تصدۍ کچې مدیریت پلیټفارمونو تحویل رهبري کول.'
                  : 'Leading architecture decisions, scalable APIs, and product delivery for enterprise-grade management platforms.'}
              </p>
            </Card>
            <Card className="ml-8">
              <h3 className="font-semibold">
                {language === 'ps'
                  ? 'فول سټک سافټویر انجنیر'
                  : 'Full Stack Software Engineer'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {language === 'ps' ? '۲۰۲۲ - ۲۰۲۴' : '2022 - 2024'}
              </p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                {language === 'ps'
                  ? 'د ERP او MIS سیستمونه جوړول چې په ښوونه، روغتیا، لوژستیک او بشري منابعو کې یې اندازه کېدونکی اغېز درلود.'
                  : 'Built ERP and MIS systems with measurable business impact across education, healthcare, logistics, and HR operations.'}
              </p>
            </Card>
          </div>
        </section>
        */}

        <section id="projects" className="scroll-mt-24">
          <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">{t('projectsTitle')}</h2>
          <div className="mb-4 flex flex-wrap gap-2 sm:mb-6">
            {(
              [
                { key: 'All', label: t('filterAll') },
                { key: 'Government', label: t('filterGovernment') },
                { key: 'Business', label: t('filterBusiness') },
              ] as const
            ).map((filter) => (
              <button
                key={filter.key}
                onClick={() =>
                  setActiveProjectFilter(
                    filter.key as 'All' | 'Government' | 'Business',
                  )
                }
                className={`rounded-full px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm ${
                  activeProjectFilter === filter.key
                    ? 'bg-cyan-400 text-slate-950'
                    : 'border border-slate-300 text-slate-700 dark:border-white/20 dark:text-slate-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <motion.div key={project.name} whileHover={{ y: -6 }}>
                <Card className="h-full">
                  <h3 className="text-base font-semibold sm:text-lg">{project.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 sm:px-3 dark:bg-white/10 dark:text-slate-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Button size="sm" className="w-full sm:w-auto">
                    Live Demo
                  </Button>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">
                    GitHub
                  </Button>
                </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="hire" className="scroll-mt-24">
          <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">{t('hireTitle')}</h2>
          <Card className="border-cyan-400/30 bg-gradient-to-r from-blue-500/20 via-violet-500/10 to-cyan-500/20 dark:from-blue-500/15 dark:via-violet-500/10 dark:to-cyan-500/15">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-3">
              <div className="min-w-0 lg:col-span-2">
                <p className="text-base font-semibold text-cyan-300 sm:text-lg">
                  {t('hireHeadline')}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-200">
                  {t('hireBody')}
                </p>
              </div>
              <div className="space-y-3">
                <a
                  href="mailto:RahimyBarialay@gmail.com"
                  className="flex min-w-0 items-center gap-2 break-all rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 hover:border-cyan-400 hover:text-cyan-600 sm:px-4 dark:border-white/20 dark:bg-white/5 dark:text-slate-100 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
                >
                  <FaEnvelope className="shrink-0" /> RahimyBarialay@gmail.com
                </a>
                <a
                  href="tel:+93781783777"
                  className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 hover:border-cyan-400 hover:text-cyan-600 sm:px-4 dark:border-white/20 dark:bg-white/5 dark:text-slate-100 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
                >
                  <FaPhone className="shrink-0" /> +93 781 783 777
                </a>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">{t('achievementsTitle')}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {localizedStats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <div className="text-xl font-bold text-cyan-300 sm:text-2xl">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1 text-[10px] leading-snug text-slate-500 sm:text-xs dark:text-slate-400">
                  {stat.label}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">{t('testimonialsTitle')}</h2>
          <Card className="bg-gradient-to-br from-violet-500/15 to-cyan-400/10">
            <p className="text-base leading-relaxed sm:text-lg">
              "{testimonials[testimonialIndex].quote}"
            </p>
            <p className="mt-2 text-sm text-cyan-300">
              {testimonials[testimonialIndex].company}
            </p>
            <div className="mt-4 flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`h-2 w-8 rounded-full ${
                    i === testimonialIndex ? 'bg-cyan-400' : 'bg-slate-300 dark:bg-white/20'
                  }`}
                />
              ))}
            </div>
          </Card>
        </section>

        <section id="contact" className="scroll-mt-24">
          <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">{t('contactTitle')}</h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
            <Card>
              <p className="text-base font-semibold sm:text-lg">Barialay Rahimi</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600 sm:text-base dark:text-slate-300">
                <a
                  href="mailto:RahimyBarialay@gmail.com"
                  className="flex min-w-0 items-start gap-2 break-all hover:text-cyan-300"
                >
                  <FaEnvelope className="mt-0.5 shrink-0" /> RahimyBarialay@gmail.com
                </a>
                <a href="tel:+93781783777" className="flex items-center gap-2 hover:text-cyan-300">
                  <FaPhone className="shrink-0" /> +93 781 783 777
                </a>
                <p className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-0.5 shrink-0" /> Kabul, Afghanistan
                </p>
              </div>
            </Card>
            <Card>
              <form className="space-y-3">
                <input
                  className="w-full min-h-11 rounded-lg border border-slate-300 bg-white p-3 text-base text-slate-900 outline-none focus:border-cyan-400 sm:text-sm dark:border-white/20 dark:bg-transparent dark:text-slate-100 dark:focus:border-cyan-300"
                  placeholder={t('contactName')}
                />
                <input
                  type="email"
                  inputMode="email"
                  className="w-full min-h-11 rounded-lg border border-slate-300 bg-white p-3 text-base text-slate-900 outline-none focus:border-cyan-400 sm:text-sm dark:border-white/20 dark:bg-transparent dark:text-slate-100 dark:focus:border-cyan-300"
                  placeholder={t('contactEmail')}
                />
                <textarea
                  className="min-h-28 w-full rounded-lg border border-slate-300 bg-white p-3 text-base text-slate-900 outline-none focus:border-cyan-400 sm:min-h-24 sm:text-sm dark:border-white/20 dark:bg-transparent dark:text-slate-100 dark:focus:border-cyan-300"
                  placeholder={t('contactMessage')}
                />
                <Button type="submit" className="w-full sm:w-auto">
                  {t('contactSend')}
                </Button>
              </form>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 px-4 py-6 text-center text-xs text-slate-500 sm:py-8 sm:text-sm dark:border-white/10 dark:text-slate-400">
        © {new Date().getFullYear()} Barialay Rahimi. All rights reserved.
      </footer>
    </div>
  )
}
