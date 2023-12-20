document.addEventListener('DOMContentLoaded', function () {


  document.getElementById('myButton').addEventListener('click', function () {
    chrome.tabs.create({ url: 'login.html' });
  });


  document.getElementById('myButton2').addEventListener('click', function () {
    var musicPlayerPopup = document.getElementById('musicPlayerPopup');
    var songList = document.getElementById('songList');

    // Clear the existing songs from the list
    while (songList.firstChild) {
      songList.removeChild(songList.firstChild);
   }

    if(musicPlayerPopup.style.display === 'none') {
        musicPlayerPopup.style.display = 'block';
        // Load and list music files here, setting them as the source for the audio player
        addSongToPopup('songs/stolen_dance.mp3')
        addSongToPopup('songs/frozen.mp3')
        addSongToPopup('songs/after_dark.mp3')
    } else {
        musicPlayerPopup.style.display = 'none';
    }
  });


  document.getElementById('myButton3').addEventListener('click', function () {
    // Code for "Recent Playlists" button
  });

  document.getElementById('myButton4').addEventListener('click', function () {
    //console.log("button 4 pressed")
    //chrome.tabs.create({ url: 'login.html' });
    chrome.runtime.sendMessage({ message: 'login' }, function (response) {
      if (response.message === 'success') window.close();
    });
  });

  document.getElementById('myButton5').addEventListener('click', async function () {
    var topTracksPopup = document.getElementById('topTracksPopup');
    var topTracksList = document.getElementById('topTracksList');
  
    // Clear the existing tracks from the list
    while (topTracksList.firstChild) {
      topTracksList.removeChild(topTracksList.firstChild);
    }
  
    // Toggle display of the top tracks list
    if(topTracksPopup.style.display === 'none') {
      topTracksPopup.style.display = 'block';
      // Fetch and display top tracks from Spotify
      const topTracks = await getTopTracks();
      topTracks.forEach(track => addTrackToPopup(track, topTracksList));
    } else {
      topTracksPopup.style.display = 'none';
    }
  });
  
  function addTrackToPopup(trackName, listElement) {
    var trackItem = document.createElement('li');
    trackItem.textContent = trackName; // Just the track name for simplicity
    listElement.appendChild(trackItem);
  }
});

// Placeholder function for getTopTracks, replace with your actual function to get the tracks
async function getTopTracks() {
  // Use the code you've written to fetch the top tracks from Spotify
  // For now, let's return dummy data
  return [
    'Appelle Moi (Scott Rill Remix)',
    'Still (I Got Summer on My Mind)',
    'Kolkata',
    'Losing It',
    'Early Morning Dreams (Kled Mone Remix)'
  ];
}

function displayTopTracks(tracks) {
  const container = document.getElementById('top-tracks-container');
  // Clear previous content
  container.innerHTML = '';

  // Create and append track names to the container
  tracks.forEach(track => {
    const trackElement = document.createElement('div');
    trackElement.textContent = track;
    container.appendChild(trackElement);
  });
}

// Function to add songs to the popup
function addSongToPopup(songPath) {
  var songList = document.getElementById('songList');
  var songItem = document.createElement('li');
  var songName = songPath.split('/').pop().split('.').shift(); // Extract the song name from the path
  songItem.textContent = songName; // Use just the file name without the extension
  songItem.className = 'song-item'; // Add a class for styling
  songItem.onclick = function() {
      var audioPlayer = document.getElementById('audioPlayer');
      audioPlayer.src = songPath; // Set the path as the source for the audio player
      audioPlayer.play(); // Play the song
  };
  songList.appendChild(songItem);
}