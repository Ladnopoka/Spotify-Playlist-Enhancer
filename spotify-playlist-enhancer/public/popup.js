let allTrackUris = []; // Global array to store track URIs

document.addEventListener('DOMContentLoaded', function () {
  let isTracksVisible = false; // State to track if tracks are currently shown


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
    chrome.tabs.create({ url: 'App.html' });
  });

  document.getElementById('myButton4').addEventListener('click', function () {
    //console.log("button 4 pressed")
    //chrome.tabs.create({ url: 'login.html' });
    chrome.runtime.sendMessage({ message: 'login' }, function (response) {
      if (response.message === 'success') window.close();
    });
  });

  document.getElementById('myButton5').addEventListener('click', async function () {
    if (!isTracksVisible) {
      chrome.runtime.sendMessage({message: "getTopTracks"}, function(response) {
          if (response.error) {
              console.error('Error:', response.error);
              // Display the error to the user
          } else if (response.topTracks) {
              displayTracks(response.topTracks);
              isTracksVisible = true;

              response.topTracks.forEach(track => {
                console.log(`Track ID: ${track.id}, \nTrack Name: ${track.name}`);
              });
          }
      });
    }else{
      // If tracks are currently shown, hide them
      const container = document.getElementById('tracks-container');
      container.innerHTML = ''; // Clear the tracks
      isTracksVisible = false; // Update state
    }
  });

  document.getElementById('recommendations_button').addEventListener('click', async () => {
    chrome.runtime.sendMessage({ message: "getTopTracks" }, function(response) {
      if (response.error) {
        console.error('Error:', response.error);
      } else if (response.topTracks) {
        const topTracksIds = response.topTracks.map(track => track.id);
        chrome.runtime.sendMessage({ message: "getRecommendations", topTracksIds: topTracksIds }, function(recommendationResponse) {
          if (recommendationResponse.error) {
            console.error('Error:', recommendationResponse.error);
          } else if (recommendationResponse.recommendations) {
            displayTracks(recommendationResponse.recommendations);
          }
        });
      }
    });
  });

  document.getElementById('generate_playlist_button').addEventListener('click', function () {
    if (allTrackUris.length > 0) {
      chrome.runtime.sendMessage({ message: "createPlaylist", tracksUri: allTrackUris }, function(response) {
        if (response.error) {
          console.error('Error:', response.error);
        } else if (response.playlist) {
          console.log('Playlist created:', response.playlist.name, response.playlist.id);
          // Reset the track URIs array after creating the playlist
          allTrackUris = [];
        }
      });
    } else {
      console.log("No tracks to add to the playlist.");
    }
  });
});

function displayTracks(tracks) {
  const container = document.getElementById('tracks-container');
  container.innerHTML = ''; // Clear previous results

  tracks.forEach((track, index) => {
    allTrackUris.push(track.uri); // Store the track URI

    const trackElement = document.createElement('div');
    trackElement.textContent = `${index + 1}. ${track.name}`;
    container.appendChild(trackElement);
  });
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