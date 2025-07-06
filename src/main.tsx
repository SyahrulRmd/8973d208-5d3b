import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from './components/navbar.tsx'
import Footer from './components/footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='flex flex-col gap-10'>
      <Navbar />
      <App />
      <Footer />
    </div>
  </StrictMode>,
)
