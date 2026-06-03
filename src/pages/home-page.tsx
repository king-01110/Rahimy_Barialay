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
      className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f8fafc_45%,#eef2ff_100%)] text-slate-900 transition-colors dark:bg-[radial-gradient(circle_at_top,#111827_0%,#020617_45%,#0b1120_100%)] dark:text-slate-100"
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
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-500/25" />
        <div className="absolute left-10 top-80 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/20" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-400/20" />
      </div>
      <header className="sticky top-0 z-50 px-2 pt-2 lg:px-6">
        <div className="flex w-full items-center justify-between rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 shadow-lg shadow-slate-300/30 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 dark:shadow-slate-950/40 lg:px-6">
          <a href="#" className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white">
              BR
            </span>
            <span className="font-semibold">Barialay Rahimi</span>
          </a>
          <nav className="hidden items-center gap-1 text-sm text-slate-600 dark:text-slate-300 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-4 py-2 transition-all ${
                  activeSection === item.id
                    ? 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300'
                    : 'hover:bg-slate-100 hover:text-cyan-700 dark:hover:bg-white/10 dark:hover:text-cyan-300'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
            <button
              className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs dark:border-white/20 dark:bg-transparent"
              onClick={() => setLanguage(language === 'en' ? 'ps' : 'en')}
            >
              {language.toUpperCase()}
            </button>
            <button
              className="rounded-full border border-slate-300 bg-white p-2 dark:border-white/20 dark:bg-transparent"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <button
              className="rounded-full border border-slate-300 bg-white p-2 dark:border-white/20 dark:bg-transparent lg:hidden"
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
            className="mt-2 rounded-2xl border border-slate-200/80 bg-white/85 p-3 shadow-lg shadow-slate-300/30 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 dark:shadow-slate-950/40 lg:hidden"
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

      <main className="relative z-10 w-full space-y-14 px-4 py-12 lg:px-10 2xl:px-16">
        <section className="grid items-center gap-8 md:grid-cols-2">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [-8, 0] }} style={{ y: heroY }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs text-cyan-700 dark:text-cyan-300">
              <FaCode /> {t('heroBadge')}
            </span>
            <p className="text-cyan-600 dark:text-cyan-400">{t('heroRole')}</p>
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">{t('heroTitle')}</h1>
            <p className="mt-4 text-cyan-300">
              {typed}
              <span className="animate-pulse">|</span>
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-300">{t('heroSubtitle')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={publicAsset('resume-barialay-rahimi.txt')} download>
                <Button>
                  <FaDownload className="mr-2" /> {t('ctaResume')}
                </Button>
              </a>
              <a href="#contact">
                <Button variant="outline">
                  <FaEnvelope className="mr-2" /> {t('ctaContact')}
                </Button>
              </a>
              <a href="#projects">
                <Button variant="ghost">
                  {t('ctaWork')} <FaArrowRight className="ml-2" />
                </Button>
              </a>
            </div>
            <div className="mt-6 flex gap-4 text-xl text-slate-600 dark:text-slate-300">
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
            className="mx-auto w-full max-w-sm perspective-1000 md:max-w-md"
          >
            <Card className="overflow-hidden border-cyan-400/20 p-0">
              <img
                src={publicAsset('profile.svg')}
                alt="Barialay Rahimi profile"
                className="h-[360px] w-full object-cover md:h-[420px]"
              />
            </Card>
          </motion.div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {['4+ Years', '50+ Projects', '30+ Clients', '15+ Technologies'].map((kpi) => (
            <Card key={kpi} className="bg-cyan-50 py-4 text-center text-cyan-700 dark:bg-white/5 dark:text-cyan-300">
              {kpi}
            </Card>
          ))}
        </section>

        <section id="about">
          <h2 className="mb-6 text-2xl font-semibold">{t('about')}</h2>
          <Card className="leading-7">
            {t('aboutBody')}
          </Card>
        </section>

        <section id="skills">
          <h2 className="mb-6 text-2xl font-semibold">{t('skillsTitle')}</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {localizedSkillCategories.map((category) => (
              <motion.div key={category.title} whileHover={{ y: -6 }}>
                <Card className="h-full">
                  <h3 className="mb-3 font-semibold text-cyan-300">{category.title}</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {category.items.map((item) => {
                      const Icon = technologyIcons[item] ?? FaCode
                      return (
                        <li
                          key={item}
                          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                        >
                          <span className="rounded-md bg-cyan-100 p-1.5 text-cyan-700 dark:bg-white/10 dark:text-cyan-300">
                            <Icon />
                          </span>
                          <span>{item}</span>
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

        <section id="projects">
          <h2 className="mb-6 text-2xl font-semibold">{t('projectsTitle')}</h2>
          <div className="mb-6 flex flex-wrap gap-2">
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
                className={`rounded-full px-4 py-1 text-sm ${
                  activeProjectFilter === filter.key
                    ? 'bg-cyan-400 text-slate-950'
                    : 'border border-slate-300 text-slate-700 dark:border-white/20 dark:text-slate-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <motion.div key={project.name} whileHover={{ y: -6 }}>
                <Card className="h-full">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-white/10 dark:text-slate-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm">Live Demo</Button>
                  <Button size="sm" variant="outline">
                    GitHub
                  </Button>
                </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="hire">
          <h2 className="mb-6 text-2xl font-semibold">{t('hireTitle')}</h2>
          <Card className="border-cyan-400/30 bg-gradient-to-r from-blue-500/20 via-violet-500/10 to-cyan-500/20 dark:from-blue-500/15 dark:via-violet-500/10 dark:to-cyan-500/15">
            <div className="grid items-center gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <p className="text-lg font-semibold text-cyan-300">
                  {t('hireHeadline')}
                </p>
                <p className="mt-2 text-slate-700 dark:text-slate-200">
                  {t('hireBody')}
                </p>
              </div>
              <div className="space-y-3">
                <a
                  href="mailto:RahimyBarialay@gmail.com"
                  className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 hover:border-cyan-400 hover:text-cyan-600 dark:border-white/20 dark:bg-white/5 dark:text-slate-100 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
                >
                  <FaEnvelope /> RahimyBarialay@gmail.com
                </a>
                <a
                  href="tel:+93781783777"
                  className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 hover:border-cyan-400 hover:text-cyan-600 dark:border-white/20 dark:bg-white/5 dark:text-slate-100 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
                >
                  <FaPhone /> +93 781 783 777
                </a>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold">{t('achievementsTitle')}</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
            {localizedStats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-cyan-300">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold">{t('testimonialsTitle')}</h2>
          <Card className="bg-gradient-to-br from-violet-500/15 to-cyan-400/10">
            <p className="text-lg">"{testimonials[testimonialIndex].quote}"</p>
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

        <section id="contact">
          <h2 className="mb-6 text-2xl font-semibold">{t('contactTitle')}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <p className="text-lg font-semibold">Barialay Rahimi</p>
              <div className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
                <a href="mailto:RahimyBarialay@gmail.com" className="flex items-center gap-2 hover:text-cyan-300">
                  <FaEnvelope /> RahimyBarialay@gmail.com
                </a>
                <a href="tel:+93781783777" className="flex items-center gap-2 hover:text-cyan-300">
                  <FaPhone /> +93 781 783 777
                </a>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt /> Kabul, Afghanistan
                </p>
              </div>
            </Card>
            <Card>
              <form className="space-y-3">
                <input className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-cyan-400 dark:border-white/20 dark:bg-transparent dark:text-slate-100 dark:focus:border-cyan-300" placeholder={t('contactName')} />
                <input className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-cyan-400 dark:border-white/20 dark:bg-transparent dark:text-slate-100 dark:focus:border-cyan-300" placeholder={t('contactEmail')} />
                <textarea className="h-24 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-cyan-400 dark:border-white/20 dark:bg-transparent dark:text-slate-100 dark:focus:border-cyan-300" placeholder={t('contactMessage')} />
                <Button type="submit">{t('contactSend')}</Button>
              </form>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
        © {new Date().getFullYear()} Barialay Rahimi. All rights reserved.
      </footer>
    </div>
  )
}
