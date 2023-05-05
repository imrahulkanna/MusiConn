import { Route, Routes } from 'react-router-dom';
import Recommendation from './pages/Recommendation';
import Home from "./pages/Home";
import Index from './pages/Index';
import UserRecommendation from "./pages/UserRecommendation";
import ChatList from "./pages/ChatList";
import ChatView from "./pages/ChatView";
import Page from "./pages/Page";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/app' element={<Index />} />
      <Route path='/trackrecommendations' element={<Recommendation />} />
      <Route path='/userrecommendations' element={<UserRecommendation />} />
<<<<<<< HEAD
      <Route path='/chatlist' element={<ChatList />} />
      <Route path='/chatview' element={<ChatView />} />
=======
      <Route path='/profile/:userId' element={<Page />} />
>>>>>>> ab3238cc9810391828ebf6a48942e9dced22430d
    </Routes>
    
  )
}

export default App
