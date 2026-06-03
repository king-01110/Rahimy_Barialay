import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { ThemeProvider } from './providers/theme-provider'
import { LanguageProvider } from './providers/language-provider'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter
        basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}
      >
        <ThemeProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
