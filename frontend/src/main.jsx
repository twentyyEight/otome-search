import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './contexts/auth/AuthProvider.jsx'
import { OtomeListProvider } from './contexts/otome_list/OtomeListProvider.jsx'
import { CharacterListProvider } from './contexts/character_list/CharacterListProvider.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <OtomeListProvider>
          <CharacterListProvider>
            <App />
          </CharacterListProvider>
        </OtomeListProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
