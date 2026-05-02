import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OtomesPage from './pages/otomes/OtomesPage'
import OtomePage from './pages/otomes/OtomePage'
import TagsPage from './pages/TagsPage'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/otomes' element={<OtomesPage />} />
                <Route path='/otomes/:id' element={<OtomePage />} />

                <Route path='/tags' element={<TagsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
