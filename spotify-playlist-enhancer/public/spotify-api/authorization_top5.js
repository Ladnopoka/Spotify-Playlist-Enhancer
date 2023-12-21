// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQA1AtrTT9yxvfHxOzIjE-KYvkeSZ7ADKJn40LsyMwub-w4yllFBGL4Wr9ztIyWNy7zIhIo1qqTySG3VGvGFEaB3m-URZAiB5aD9am7qVG_0j3URGfJ84s7pQse8FwRPiY4b4jrBarbF-PMLbenMo2xIRqNsHrxPXXG6pmIs0xengCfkmw';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);