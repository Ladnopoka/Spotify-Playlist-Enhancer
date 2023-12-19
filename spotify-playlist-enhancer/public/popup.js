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
    chrome.runtime.sendMessage({ message: 'login' }, function (response) {
      if (response.message === 'success') window.close();
    });
  });


});

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