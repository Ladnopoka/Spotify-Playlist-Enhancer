// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ items: [{ id: '1', name: 'Song 1', uri: 'spotify:track:123' }] }),
  })
);

// My function that I copied from background.js
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
    //I'm mapping through the items array from the response and rreturning an object for each track that includes id, name, artist name and track uri.
    return data.items.map(track => ({
      id: track.id, // Extracting the ID
      name: track.name, // Extracting the name 
      uri: track.uri
    }));
  }

// The actual Tests
describe('Spotify Extension', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('getTopTracks returns a list of tracks', async () => {
    const tracks = await getTopTracks();
    expect(tracks).toBeInstanceOf(Array);
    expect(tracks).toHaveLength(1);
    expect(tracks[0]).toHaveProperty('id');
    expect(tracks[0]).toHaveProperty('name');
    expect(tracks[0]).toHaveProperty('uri');
  });
});