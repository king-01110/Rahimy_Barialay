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
      className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f8fafc_45%,#eef2ff_100%)] px-4 py-10 text-slate-900 dark:bg-[radial-gradient(circle_at_top,#111827_0%,#020617_45%,#0b1120_100%)] dark:text-slate-100"
    >
      <Helmet>
        <title>Blog | Barialay Rahimi</title>
        <meta name="description" content="Engineering blog by Barialay Rahimi." />
      </Helmet>
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="text-cyan-600 hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-200">
          ← {t('blogBack')}
        </Link>
        <h1 className="mt-4 text-4xl font-bold">{t('blogTitle')}</h1>
        <div className="mt-8 grid gap-4">
          {posts.map((post) => (
            <Card key={post.title}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
