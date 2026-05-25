import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider'

createRoot(document.getElementById('root')).render(

  <ThemeProvider
    breakpoints={['xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xs"
  >
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
)
