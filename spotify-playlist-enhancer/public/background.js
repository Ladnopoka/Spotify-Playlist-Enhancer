chrome.action.onClicked.addListener((tab) => {
    console.log("Chrome extension happened yep...")
    chrome.tabs.create({ url: 'https://example.com' });
  });