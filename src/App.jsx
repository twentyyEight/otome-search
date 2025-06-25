import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VisualNovelList from './pages/VisualNovelList'
import VisualNovelPage from './pages/VisualNovelPage'

function App() {

  return (
    <BrowserRouter basename="/vndbapi">
      <Routes>
        <Route path='/' element={<VisualNovelList />}/>
        <Route path='/vn/:id' element={<VisualNovelPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
