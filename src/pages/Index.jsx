import spotifyLogo from "../assets/spotify.svg"
import "../App.css"

function Index() {
  return (
    <div className="App">
      <div className="musiconn">MusiConn</div>
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
    </div>
  )
}

export default Index