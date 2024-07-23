export const getLyrics = async (tracks) => {
  let lyrics = [];
  for (let track of tracks) {
    const lyric = await getLyric(track.artist, track.name);
    if(lyric) {
      lyrics.push({ name: track.name, artist: track.artist, lyric });
    }
  }

  return lyrics;
};

export const getLyric = async (artist, track) => {
  const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${track}`);
  const data = await response.json();
  return data.lyrics || null;
};
