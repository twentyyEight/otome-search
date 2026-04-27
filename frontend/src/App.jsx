import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OtomesPage from './pages/OtomesPage'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/otomes' element={<OtomesPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
