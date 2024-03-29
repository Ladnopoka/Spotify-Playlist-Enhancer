import logo from './logo.svg';
import './App.css';
import db from "./firebase";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <div className="App-buttons">
          <button onClick={() => alert('Create Playlist button clicked')}>
            Create Playlist
          </button>
          <button onClick={() => alert('View Playlists button clicked')}>
            View Playlists
          </button>
        </div>
      </header>
    </div>
  );
}
export default App;