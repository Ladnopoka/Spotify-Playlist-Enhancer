// chrome.action.onClicked.addListener((tab) => {
//     console.log("Chrome extension happened yep...")
//     chrome.tabs.create({ url: 'https://example.com' });
//   });

const CLIENT_ID = encodeURIComponent('61b346139beb4503855eb7be6a217138');
const RESPONSE_TYPE = encodeURIComponent('token');
const REDIRECT_URI = encodeURIComponent('https://eieaapoiogpkcmogppnjpbgccjlklcno.chromiumapp.org/');
const SCOPE = encodeURIComponent('user-read-email user-top-read user-library-read playlist-read-private');
const SHOW_DIALOG = encodeURIComponent('true');
let STATE = '';
let ACCESS_TOKEN = '';

//so that user can't authorize multiple times
let user_signed_in = false;

//create endpoint code taken from official spotify dev site
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

  console.log("OAuth2 URL: " + oauth2_url);
  return oauth2_url;
}

//also taken from spotify dev website, generates access tokens and states
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
            ACCESS_TOKEN = redirect_url.substring(redirect_url.indexOf('access_token=') + 13);
            ACCESS_TOKEN = ACCESS_TOKEN.substring(0, ACCESS_TOKEN.indexOf('&'));
            let state = redirect_url.substring(redirect_url.indexOf('state=') + 6);
            
            //I've put extra print statements here so you can see all the access tokens and states printed and you can use
            if (state == STATE){
              console.log("You have successfully signed in!\nYour Spotify account is now connected to the App")
              console.log("ACCESS TOKEN: " + ACCESS_TOKEN);
              console.log("STATE: " + state);
              user_signed_in = true;

              getTopTracks().then(topTracks => {
                console.log('Top 5 Tracks from your Spotify account: ', topTracks);
              });

              // this is just to dump the token after some time
              setTimeout(() => {
                ACCESS_TOKEN = '';
                user_signed_in = false;
              }, 3600000)
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
    //if you want to log out
  } else if (request.message === 'logout') {
    user_signed_in = false;
    chrome.browserAction.setPopup({ popup: './popup.html' }, () => {
      sendResponse({ message: 'success' });
    });

    return true;
  }
});

//Need this event listener to listen for messages from popup.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "getTopTracks") {
      getTopTracks().then(tracks => {
        sendResponse({ topTracks: tracks });
      }).catch(error => {
        console.error('Error fetching top tracks:', error);
        sendResponse({ error: error.message });
      });
      return true; // Return true to indicate you wish to send a response asynchronously
    }
    if (request.message === "getRecommendations") {
      getRecommendations(request.topTracksIds).then(recommendations => {
        sendResponse({ recommendations: recommendations });
      }).catch(error => {
        console.error('Error fetching recommendations:', error);
        sendResponse({ error: error.message });
      });
      return true; // Return true to indicate you wish to send a response asynchronously
    }
  }
);

//the below code just extracts your top songs from Spotify API
async function getTopTracks() {
  if (!ACCESS_TOKEN) {
    console.error('Access Token is missing');
    return;
  }

  const response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5', {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    method: 'GET'
  });

  if (!response.ok) {
    console.error('Failed to fetch top tracks:', response.statusText);
    return;
  }

  const data = await response.json();
  //I'm mapping through the items array from the response and rreturning an object for each track that includes id, name, artist name.
  return data.items.map(track => ({
    id: track.id, // Extracting the ID
    name: track.name, // Extracting the name 
    //artists: track.artists.map(artist => artist.name).join(', ') // Extracting artist names and joining them with a comma
    //artist is a bit mor complicated, disabled for now.
  }));
}

async function getRecommendations(topTracksIds) {
  if (!ACCESS_TOKEN) {
    console.error('Access Token is missing');
    return;
  }

  const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch recommendations:', response.statusText);
    return;
  }

  const data = await response.json();
  return data.tracks.map(track => ({
    name: track.name,
    artists: track.artists.map(artist => artist.name).join(', ')
  }));
}
  