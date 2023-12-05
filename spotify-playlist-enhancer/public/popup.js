//import './popup.css';

document.addEventListener('DOMContentLoaded', function () {


  document.getElementById('myButton').addEventListener('click', function () {
    chrome.tabs.create({ url: 'login.html' });
  });


  document.getElementById('myButton2').addEventListener('click', function () {
    var musicPlayerPopup = document.getElementById('musicPlayerPopup');
    if(musicPlayerPopup.style.display === 'none') {
        musicPlayerPopup.style.display = 'block';
        // Load and list music files here, setting them as the source for the audio player
        addSongToPopup('songs/MilkyChanceStolenDance.mp3')
        addSongToPopup('songs/frozen.mp3')
        addSongToPopup('songs/after_dark.mp3')
    } else {
        musicPlayerPopup.style.display = 'none';
    }
  });


  document.getElementById('myButton3').addEventListener('click', function () {
    // Code for "Recent Playlists" button
  });


});

// Function to add songs to the popup
function addSongToPopup(songPath) {
  var songList = document.getElementById('songList');
  var songItem = document.createElement('li');
  songItem.textContent = songPath; // Use the file name or some identifier
  songItem.onclick = function() {
      var audioPlayer = document.getElementById('audioPlayer');
      audioPlayer.src = songPath; // Set the path as the source for the audio player
      audioPlayer.play(); // Play the song
  };
  songList.appendChild(songItem);
}