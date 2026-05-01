import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OtomesPage from './pages/OtomesPage'
import TagsPage from './pages/TagsPage'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/otomes' element={<OtomesPage />} />
                <Route path='/tags' element={<TagsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
