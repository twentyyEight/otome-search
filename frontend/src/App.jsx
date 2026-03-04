import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OtomeDetail from './pages/OtomeDetail'
import OtomeList from './pages/OtomeList'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/otomes' element={<OtomeList />} />
        <Route path='/otomes/:id' element={<OtomeDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
