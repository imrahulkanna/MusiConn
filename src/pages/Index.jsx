import { NavBar } from "../api_calls/NavBar.jsx";
import { CurrentTrack } from "../api_calls/CurrentTrack";
import "../App.css"

function Index() {
  return (
    <div className="App">
      <NavBar />
      <CurrentTrack />
    </div>
  );
}

export default Index