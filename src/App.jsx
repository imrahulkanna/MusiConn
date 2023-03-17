import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Index from './pages/Index';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/app' element={<Index />} />
    </Routes>
    
  )
}

export default App
