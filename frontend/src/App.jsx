import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import OtomeDetail from './pages/OtomeDetail'
import OtomeList from './pages/OtomeList'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/otomes' element={<OtomeList />} />
        <Route path='/otomes/:id' element={<OtomeDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
