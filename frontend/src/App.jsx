import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OtomePage from './pages/otomes/OtomePage'
import OtomesPage from './pages/otomes/OtomesPage'
import Register from './pages/auth/RegisterPage'
import Login from './pages/auth/LoginPage'
import Profile from './pages/auth/ProfilePage'
import Navbar from './components/Navbar'
import { AuthProvider } from './contexts/auth/AuthProvider'
import { CollectionProvider } from './contexts/collection/CollectionProvider'
import ProtectedRoute from './routes/ProtectedRoute'
import TagsPage from './pages/tags/TagsPage'
import TagPage from './pages/tags/TagPage'
import DevPage from './pages/DevPage'
import HomePage from './pages/HomePage'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <CollectionProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            <Route path='/otomes' element={<OtomesPage />} />
            <Route path='/otomes/:id' element={<OtomePage />} />

            <Route path='/tags' element={<TagsPage />} />
            <Route path='/tags/:id' element={<TagPage />} />

            <Route path='/devs/:id' element={<DevPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/profile/:name' element={<Profile />} />
            </Route>

          </Routes>
        </CollectionProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
