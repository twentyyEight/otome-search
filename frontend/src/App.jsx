import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OtomePage from './pages/otomes/OtomePage'
import OtomesPage from './pages/otomes/OtomesPage'
import Register from './pages/auth/RegisterPage'
import Login from './pages/auth/LoginPage'
import Profile from './pages/auth/ProfilePage'
import Navbar from './components/Navbar'
import { AuthProvider } from './contexts/auth/AuthProvider'
import { StateProvider } from './contexts/state/StateProvider'
import ProtectedRoute from './routes/ProtectedRoute'
import TagsPage from './pages/tags/TagsPage'
import TagPage from './pages/tags/TagPage'
import DevPage from './pages/devs/DevPage'
import HomePage from './pages/HomePage'
import TagsCategories from './pages/tags/TagsCategoriesPage'
import TraitsCategories from './pages/traits/TraitsCategoriesPage'
import TraitsPage from './pages/traits/TraitsPage'
import TraitPage from './pages/traits/TraitPage'
import CharactersPage from './pages/characters/CharactersPage'
import CharacterPage from './pages/characters/CharacterPage'
import DevsPage from './pages/devs/DevsPage'
import { CharacterProvider } from './contexts/character/CharacterProvider'
import { OtomeProvider } from './contexts/otome/OtomeProvider'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <StateProvider>
          <CharacterProvider>
            <OtomeProvider>
              <Navbar />
              <Routes>
                <Route path='/' element={<HomePage />} />

                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />

                <Route path='/otomes' element={<OtomesPage />} />
                <Route path='/otomes/:id' element={<OtomePage />} />

                <Route path='/tags' element={<TagsPage />} />
                <Route path='/tags/categories' element={<TagsCategories />} />
                <Route path='/tags/:id' element={<TagPage />} />

                <Route path='/traits' element={<TraitsPage />} />
                <Route path='/traits/categories' element={<TraitsCategories />} />
                <Route path='traits/:id' element={<TraitPage />} />

                <Route path='/characters' element={<CharactersPage />} />
                <Route path='/characters/:id' element={<CharacterPage />} />

                <Route path='/developers' element={<DevsPage />} />
                <Route path='/developers/:id' element={<DevPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path='/profile/:name' element={<Profile />} />
                </Route>

              </Routes>
            </OtomeProvider>
          </CharacterProvider>
        </StateProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
