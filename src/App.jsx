import { useState } from 'react'
import reactLogo from './assets/react.svg'
import spotifyLogo from './assets/spotify.svg'
import './App.css'

function openAuthPage() {
    const tokenEndPoint = 'https://accounts.spotify.com/api/token';
    const authEndPoint = 'https://accounts.spotify.com/authorize?';
    var clientID = '874f362955384d4f82bcd802660e4b0c';
    var clientSecret = 'acb440a270aa451694ca257703ae07e9';

}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={spotifyLogo} className="logo" alt="Spotify logo" />
        </a>
        {/* <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
      <h1>MusiConn</h1>
      <div className="card">
        <button className='spotifyLogin' onClick={openAuthPage}>
          Login with Spotify
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
