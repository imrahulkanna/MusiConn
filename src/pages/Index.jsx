import { onPageLoad } from "./config"
import { Link } from "react-router-dom";
import { CurrentTrack } from "../api_calls/CurrentTrack"
import "../App.css"

function Index() {
  onPageLoad();
  return (
    <div className="App">
      <div className="musiconn">MusiConn</div>
      <Link to='/recommendations'>
        <button className="recommendSongsWrapper">
          <div className="recommendSongs">Recommendations</div>
        </button>
      </Link>
      <h1>Current Track</h1>
      <CurrentTrack />
    </div>
  )
}

export default Index