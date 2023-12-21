// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQA1AtrTT9yxvfHxOzIjE-KYvkeSZ7ADKJn40LsyMwub-w4yllFBGL4Wr9ztIyWNy7zIhIo1qqTySG3VGvGFEaB3m-URZAiB5aD9am7qVG_0j3URGfJ84s7pQse8FwRPiY4b4jrBarbF-PMLbenMo2xIRqNsHrxPXXG6pmIs0xengCfkmw';
async function fetchWebApi(endpoint, method, body, accessToken) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(accessToken) {
  // Pass the access token to the fetchWebApi function
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET', null, accessToken
  )).items;
}

// This is just a placeholder. You'll get the access token from your extension's authentication flow
let accessToken = 'YOUR_ACCESS_TOKEN_FROM_EXTENSION';

const topTracks = await getTopTracks(accessToken);
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);