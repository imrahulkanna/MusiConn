import { Route, Routes } from "react-router-dom";
import Recommendation from "./pages/Recommendation";
import Home from "./pages/Home";
import Index from "./pages/Index";
import UserRecommendation from "./pages/UserRecommendation";
import Page from "./pages/Page";
import ChatRoom from "./pages/ChatRoom";
import ChatList from "./pages/ChatList";
import ChatView from "./pages/ChatView";
import Landing from "./pages/Landing";
import Connections  from "./pages/Connections";
import AboutUs from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path="/app" element={<Landing />}/>
      <Route path='/currenttrack' element={<Index />} />
      <Route path='/trackrecommendations' element={<Recommendation />} />
      <Route path='/userrecommendations' element={<UserRecommendation />} />
      <Route path='/chatlist' element={<ChatList />} />
      <Route path='/chatview' element={<ChatView />} />
      <Route path='/chatroom' element={<ChatRoom />} />
      <Route path='/profile/:userId' element={<Page />} />
      <Route path='/connections' element={<Connections />} />
      <Route path='/aboutus' element={<AboutUs />}/>
    </Routes>
  );
}

export default App;
