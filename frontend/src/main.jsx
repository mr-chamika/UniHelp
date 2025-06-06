import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import SideBar from './Components/SideBar/SideBar.jsx'
import TopBar from './Components/TopBar/TopBar.jsx'
import { UserContextProvider } from './Contexts/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </StrictMode>,
)
