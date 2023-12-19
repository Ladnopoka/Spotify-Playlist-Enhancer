// chrome.action.onClicked.addListener((tab) => {
//     console.log("Chrome extension happened yep...")
//     chrome.tabs.create({ url: 'https://example.com' });
//   });

let user_signed_in = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'login') {
    if (user_signed_in)
    {
      console.log("User is already signed in.");
    } else {
      // sign in to spotify here
    }
  } else if (request.message === 'logout') {
    user_signed_in = false;
    chrome.browserAction.setPopup({ popup: './popup.html' }, () => {
      sendResponse({ message: 'success' });
    });

    return true;
  }
});
  