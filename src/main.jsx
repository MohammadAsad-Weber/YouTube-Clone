import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import IndexContext from './Context/IndexContext.jsx';  // Context API

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IndexContext>
      <App />
    </IndexContext >
  </StrictMode>,
)
