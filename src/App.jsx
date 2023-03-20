import { Route, Routes } from 'react-router-dom';
import Recommendation from './pages/Recommendation';
import Home from "./pages/Home";
import Index from './pages/Index';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/app' element={<Index />} />
      <Route path='/recommendations' element={<Recommendation />} />
    </Routes>
    
  )
}

export default App
