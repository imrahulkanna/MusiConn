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
        <a href="https://vitejs.dev" target="_blank">
          <img src={spotifyLogo} className="logo" alt="Spotify logo" />
        </a>
      </div>
      <h1>MusiConn</h1>
      <div className="desc-container">
        <div className="desc">
            Connect with people who love the same song, share how it makes you feel,
            or just enjoy a moment together
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