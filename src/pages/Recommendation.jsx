import "../App.css"
import { Recommendations } from "../api_calls/SongRecommend";

function Recommendation() {
  return (
    <div className="App">
      <div className="musiconn">MusiConn</div>
      <Recommendations />
    </div>
  )
}

export default Recommendation
