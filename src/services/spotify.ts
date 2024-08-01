export const getTopTracks = async (accessToken: string) => {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=10",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
};


export const getTopArtists = async (accessToken: string) => {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?limit=5",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
};


export const getTopGenres = (artists: any[]) => {
  const counts = artists.flatMap(artist => artist.genres)
    .reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {});
  const topGenres = Object.keys(counts)
    .sort((a, b) => counts[b] - counts[a])
    .slice(0, 5 ?? counts.length)
    .map(genre => ({ name: genre }));
  return topGenres;
};


export const normalizeTracks = (tracks: any[]) => {
  return tracks.map((track: any) => ({
      name: track.name,
      artist: track.artists.map((artist: any) => artist.name).join(", "),
      popularity: track.popularity,
      explicit: track.explicit,
      image: track.album.images[0].url ?? null,
  }));
}

export const normalizeArtists = (artists: any[]) => {
  return artists.map((artist: any) => ({
      name: artist.name,
      genres: artist.genres,
      image: artist.images[0].url ?? null,
  })
)}