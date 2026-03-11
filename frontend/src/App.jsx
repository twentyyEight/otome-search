import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OtomeDetail from './pages/OtomeDetail'
import OtomeList from './pages/OtomeList'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import { AuthProvider } from './contexts/AuthProvider'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          
          <Route path='/otomes' element={<OtomeList />} />
          <Route path='/otomes/:id' element={<OtomeDetail />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
