import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from './components/navbar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='flex flex-col '>
      <Navbar />
      <App />
    </div>
  </StrictMode>,
)
