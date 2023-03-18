import spotifyLogo from "../assets/spotify.svg"
import "../App.css"
import { onPageLoad } from "./Config"
import { CurrentTrack } from "./SpotifyApiCalls"

function Index() {
  onPageLoad();
  return (
    <div className="App">
      <div className="musiconn">MusiConn</div>
      <h1>MusiConn</h1>
      <CurrentTrack />
    </div>
  )
}

export default Index