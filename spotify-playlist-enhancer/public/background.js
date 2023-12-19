// chrome.action.onClicked.addListener((tab) => {
//     console.log("Chrome extension happened yep...")
//     chrome.tabs.create({ url: 'https://example.com' });
//   });

const CLIENT_ID = encodeURIComponent('61b346139beb4503855eb7be6a217138');
const RESPONSE_TYPE = encodeURIComponent('token');
const REDIRECT_URI = encodeURIComponent('https://eieaapoiogpkcmogppnjpbgccjlklcno.chromiumapp.org/');
const SCOPE = encodeURIComponent('user-read-email');
const SHOW_DIALOG = encodeURIComponent('true');
let STATE = '';


let user_signed_in = false;

function create_spotify_endpoint() {
  STATE = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15));

  let oauth2_url =
    `https://accounts.spotify.com/authorize
?client_id=${CLIENT_ID}
&response_type=${RESPONSE_TYPE}
&redirect_uri=${REDIRECT_URI}
&state=${STATE}
&scope=${SCOPE}
&show_dialog=${SHOW_DIALOG}`;

  console.log(oauth2_url);
  return oauth2_url;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'login') {
    if (user_signed_in)
    {
      console.log("User is already signed in.");
    } else {
      // sign in to spotify here
      chrome.identity.launchWebAuthFlow({
        url: create_spotify_endpoint(),
        interactive: true
      }, function (redirect_url) {
        if (chrome.runtime.lastError) {
          sendResponse({ message: 'fail'})
        } else {
          if (redirect_url.includes('callback?error=access_denied')) {
            sendResponse({ message: 'fail'})
          } else{
            console.log(redirect_url)
            let access_token = redirect_url.substring(redirect_url.indexOf('access_token=') + 13);
            access_token = access_token.substring(0, access_token.indexOf('&'));
            let state = redirect_url.substring(redirect_url.indexOf('state=') + 6);
            

            if (state == STATE){
              console.log("SUCCESS!!!")
              console.log(access_token);
              console.log(state);
              // chrome.browserAction.setPopup({ popup: './popup.html' }, () => {
              //   sendResponse({ message: 'success' });
              // });
              //sendResponse({message: 'success'})
            } else {
              sendResponse({ message: 'fail'})
            }
          }
        }
      });
    }

    return true;
  } else if (request.message === 'logout') {
    user_signed_in = false;
    chrome.browserAction.setPopup({ popup: './popup.html' }, () => {
      sendResponse({ message: 'success' });
    });

    return true;
  }
});
  