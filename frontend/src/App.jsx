import { Route, Routes, useLocation } from 'react-router-dom'
import OtomesPage from './pages/otomes/OtomesPage'
import OtomePage from './pages/otomes/OtomePage'
import TagsModal from './pages/tags/TagsModal'
import TagModal from './pages/tags/TagModal'

function App() {

    const location = useLocation()
    const state = location.state

    console.log(location)

    return (
        <>
            <Routes location={state?.background || location}>
                <Route path="/otomes" element={<OtomesPage />} />
                <Route path="/otomes/:id" element={<OtomePage />} />
            </Routes>

            {state?.background && (
                <Routes>
                    <Route path="/tags" element={<TagsModal />} />
                    <Route path="/tags/:id" element={<TagModal />} />
                </Routes>
            )}
        </>
    )
}

export default App
