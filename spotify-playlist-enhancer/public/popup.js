document.getElementById('openPicture').addEventListener('click', function() {
    chrome.tabs.create({url: 'https://example.com/picture.jpg'});
  });