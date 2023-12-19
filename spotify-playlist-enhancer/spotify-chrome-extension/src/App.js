import logo from './logo.svg';
import './App.css';
<link rel="stylesheet" type="text/css" href="spotify-api/spotify-playlist-enhancer/src/App.css"></link>

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />
        <p>
          
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
  </a>*/}
      
        <button class="createButton" onClick={() => alert('Create Playlist button clicked')}>
          Create Playlist
        </button>
        <button class="viewButton" onClick={() => alert('Create Playlist button clicked')}>
          View Playlists
        </button>
        
        <div class="squareL"></div>
        <div class="squareR"></div>

        <div class="icon">
        <div class="arrow"></div>
        </div>
        


      </header>
    </div>
  );
}
//Makes arrow move back and forth on click
const $icon = document.querySelector('.icon');
const $arrow = document.querySelector('.arrow');

$icon.onclick = () => {
  $arrow.animate([
    {left: '0'},
    {left: '10px'},
    {left: '0'}
  ],{
    duration: 700,
    iterations: Infinity
  });
}
export default App;
