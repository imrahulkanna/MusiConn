import spotifyLogo from "../assets/spotify.svg"
import { requestAuthorization } from "./config"
import "../App.css"

function Home() {
  return (
    <div className="App">
      <div className="musiconn">MusiConn</div>
      <button className="logInWithSpotifyWrapper" onClick={requestAuthorization}>
        <div className="logInWith">Log in with Spotify</div>
      </button>       
      <div>
        <img src={spotifyLogo} className="logo" alt="Spotify logo" />
      </div>
      <h1 className="hometitle">MusiConn</h1>
      <div className="desc-container">
        <div className="desc">
            Plug into MusiConn and let the magic of music bring you closer to your
            tribe of music enthusiasts.
        </div>
      </div>
      <div className="card">
        <button className='spotifyLogin' onClick={requestAuthorization}>
          Login with Spotify
        </button>
      </div>
    </div>
  )
}

export default Home