import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/card'
import { useLanguage } from '../providers/language-provider'

export function BlogPage() {
  const { t, language } = useLanguage()
  const posts = [
    {
      title: t('blogPost1Title'),
      excerpt: t('blogPost1Excerpt'),
    },
    {
      title: t('blogPost2Title'),
      excerpt: t('blogPost2Excerpt'),
    },
    {
      title: t('blogPost3Title'),
      excerpt: t('blogPost3Excerpt'),
    },
  ]

  return (
    <div
      dir={language === 'ps' ? 'rtl' : 'ltr'}
      className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f8fafc_45%,#eef2ff_100%)] px-3 py-8 text-slate-900 sm:px-5 sm:py-10 md:px-6 dark:bg-[radial-gradient(circle_at_top,#111827_0%,#020617_45%,#0b1120_100%)] dark:text-slate-100"
    >
      <Helmet>
        <title>Blog | Barialay Rahimi</title>
        <meta name="description" content="Engineering blog by Barialay Rahimi." />
      </Helmet>
      <div className="mx-auto w-full max-w-4xl min-w-0">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-cyan-600 hover:text-cyan-500 sm:text-base dark:text-cyan-300 dark:hover:text-cyan-200"
        >
          ← {t('blogBack')}
        </Link>
        <h1 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
          {t('blogTitle')}
        </h1>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5">
          {posts.map((post) => (
            <Card key={post.title}>
              <h2 className="text-lg font-semibold leading-snug sm:text-xl">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                {post.excerpt}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
