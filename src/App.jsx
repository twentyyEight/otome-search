import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VisualNovelList from './components/VisualNovelList'
import VisualNovelPage from './components/VisualNovelPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<VisualNovelList />}/>
        <Route path='/vn/:id' element={<VisualNovelPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
