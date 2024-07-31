export const getLyrics = async (tracks) => {
  let lyrics = [];
  for (let track of tracks) {
    const lyric = await getLyric(track.artist, track.name);
    if (lyric) {
      lyrics.push({ name: track.name, artist: track.artist, lyric });
    }
  }

  return lyrics;
};

const getLyric = async (artist, track) => {
  const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${track}`);
  const data = await response.json();
  return data.lyrics || null;
};


export const normalizeSummary = (summary: any[]) => {
  return summary.map((item: any) => ({
    ...item,
    body: item.body.split("."),
  }));
}