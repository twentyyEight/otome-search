import { Route, Routes, useLocation } from 'react-router-dom'
import OtomesPage from './pages/otomes/OtomesPage'
import OtomePage from './pages/otomes/OtomePage'
import TagsPage from './pages/tags/TagsPage'
import TagPage from './pages/tags/TagPage'

function App() {

    const location = useLocation()
    const state = location.state

    return (
        <>
            <Routes location={state?.background || location}>
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
