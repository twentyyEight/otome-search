import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OtomeDetail from './pages/OtomeDetail'
import OtomeList from './pages/OtomeList'
import Register from './pages/auth/RegisterPage'
import Login from './pages/auth/LoginPage'
import Profile from './pages/auth/ProfilePage'
import Navbar from './components/Navbar'
import { AuthProvider } from './contexts/auth/AuthProvider'
import { CollectionProvider } from './contexts/collection/CollectionProvider'
import ProtectedRoute from './routes/ProtectedRoute'
import TagsPage from './pages/TagsPage'
import TagPage from './pages/TagPage'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <CollectionProvider>
          <Navbar />
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            <Route path='/otomes' element={<OtomeList />} />
            <Route path='/otomes/:id' element={<OtomeDetail />} />

            <Route path='/tags' element={<TagsPage />} />
            <Route path='/tags/:id' element={<TagPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>

          </Routes>
        </CollectionProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
