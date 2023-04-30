import "../App.css"
import UserRecommend from "../api_calls/UserRecommend";

function UserRecommendation() {
  return (
    <div className="App">
      <div className="musiconn">MusiConn</div>
      <UserRecommend />
    </div>
  )
}

export default UserRecommendation