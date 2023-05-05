import { Route, Routes } from "react-router-dom";
import Recommendation from "./pages/Recommendation";
import Home from "./pages/Home";
import Index from "./pages/Index";
import UserRecommendation from "./pages/UserRecommendation";
import Page from "./pages/Page";
import ChatRoom from "./pages/ChatRoom";
import ChatList from "./pages/ChatList";
import ChatView from "./pages/ChatView";


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/app' element={<Index />} />
      <Route path='/trackrecommendations' element={<Recommendation />} />
      <Route path='/userrecommendations' element={<UserRecommendation />} />
      <Route path='/chatlist' element={<ChatList />} />
      <Route path='/chatview' element={<ChatView />} />
      <Route path='/profile/:userId' element={<Page />} />
    </Routes>
  );
}

export default App;
