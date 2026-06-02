import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/home-page'
import { BlogPage } from './pages/blog-page'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
