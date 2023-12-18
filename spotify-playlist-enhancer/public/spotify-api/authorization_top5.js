// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQB1fW4TT1RZBvldwy5_EyA7HVWK1EwBgI4678Tl5wBBYkqn0agDY767g6dUi-9ZTadG2HQob4_UouvTWmh2b9MNd4uxJQBWDCRUi8RGJ8TWTk_8xFM5iHazjDfDhY4gvIg8UvE6Uoco0rEAeC1lQAbq-Ta-Fk_5a5AsF6rNwXRBFAWNowisv9VbpoP4ReuMzeexlDpi6flGIdWV2yfGYNIu5H0zXLIw42Ngjc7uksYuwYuG0IDChJRmKx0hVq1r9Q';
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