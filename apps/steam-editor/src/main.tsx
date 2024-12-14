import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className={'min-h-screen min-w-full flex mx-auto bg-white'}>
        <App/>
    </div>
  </StrictMode>
)
