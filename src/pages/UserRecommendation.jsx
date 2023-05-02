import "../App.css";
import { NavBar } from "../api_calls/NavBar.jsx";
import UserRecommend from "../api_calls/UserRecommend";

function UserRecommendation() {
  return (
    <div className="App">
      <NavBar />
      <UserRecommend />
    </div>
  )
}

export default UserRecommendation;