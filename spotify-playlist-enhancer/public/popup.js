//import './popup.css';

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('myButton').addEventListener('click', function () {
    chrome.tabs.create({ url: 'login.html' });
  });
  document.getElementById('myButton2').addEventListener('click', function () {
    // Code for "My Playlists" button
  });
  document.getElementById('myButton3').addEventListener('click', function () {
    // Code for "Recent Playlists" button
  });
});