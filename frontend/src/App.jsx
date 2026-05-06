import { Route, Routes, useLocation } from 'react-router-dom'
import OtomesPage from './pages/otomes/OtomesPage'
import OtomePage from './pages/otomes/OtomePage'
import TagsPage from './pages/tags/TagsPage'
import TagPage from './pages/tags/TagPage'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import Navbar from './components/Navbar'

function App() {

    const location = useLocation()
    const state = location.state

    return (
        <>
            <Navbar />
            <Routes location={state?.background || location}>

                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />

                <Route path="/otomes" element={<OtomesPage />} />
                <Route path="/otomes/:id" element={<OtomePage />} />

                <Route path="/tags" element={<TagsPage />} />
                <Route path="/tags/:id" element={<TagPage />} />
            </Routes>

            {state?.background && (
                <Routes>
                    <Route path="/tags" element={<TagsPage />} />
                    <Route path="/tags/:id" element={<TagPage />} />
                </Routes>
            )}
        </>
    )
}

export default App
