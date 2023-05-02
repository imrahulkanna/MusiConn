import "../App.css"
import { NavBar } from "../api_calls/NavBar.jsx";
import { Recommendations } from "../api_calls/SongRecommend";

function Recommendation() {
  return (
    <div className="App">
      <NavBar />
      <Recommendations />
    </div>
  );
}

export default Recommendation
