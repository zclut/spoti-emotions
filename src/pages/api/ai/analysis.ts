import type { APIRoute } from "astro";
import { getTopArtists, getTopGenres, getTopTracks, normalizeArtists, normalizeTracks } from "@/services/spotify";
import { getLyrics, normalizeSummary } from "@/services/lyrics";
import { getSummary } from "@/lib/ai-summary";
import { FAKEDATA, FAKEFAVORITEARTISTS, FAKEFAVORITEGENRES, FAKEFAVORITETRACKS } from "@/lib/fake-data";

const handleResponse = (json: any, status: number) => {
  return new Response(JSON.stringify(json), { status });
};

const STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};

export const POST: APIRoute = async ({ request }) => {
  // If we are in development mode, we will return fake data
  if (import.meta.env.DEBUG) {
    let rs = FAKEDATA.map((item: any) => {
      return {
        ...item,
        body: item.body.split("."),
      };
    });
    let result = {
      storyline: rs,
      favoriteTracks: [...FAKEFAVORITETRACKS],
      favoriteArtists: [...FAKEFAVORITEARTISTS],
      favoriteGenres: [...FAKEFAVORITEGENRES],
    }
    return handleResponse(result, STATUS.OK);
  }

  const body = await request.json();
  const { accessToken, username } = body;
  if (!accessToken) handleResponse({ error: "Access token is required" }, STATUS.BAD_REQUEST);

  try {
    // Get top tracks
    const responseTracks = await getTopTracks(accessToken);
    const { items: itemsTrack, error: errorTrack } = await responseTracks.json();
    if (responseTracks.status !== 200) handleResponse({ error: errorTrack }, responseTracks.status);
    const tracks = normalizeTracks(itemsTrack)

    const popularityMedian = tracks.reduce((acc, track) => acc + track.popularity, 0) / tracks.length;

    // Get lyrics and summary
    const dataLyrics = await getLyrics(tracks);
    const result = await getSummary(dataLyrics, username, popularityMedian);
    const storyline = normalizeSummary(result);

    // Get the 5 best tracks
    const favoriteTracks = tracks.slice(0, 5);

    // Get the 5 best artists
    const responseArtists = await getTopArtists(accessToken);
    const { items: itemsArtist, error: errorArtist } = await responseArtists.json();
    if (responseArtists.status !== 200) handleResponse({ error: errorArtist }, responseArtists.status);

    const artists = normalizeArtists(itemsArtist);
    const genres = getTopGenres(artists);

    let returnData = {
      storyline: storyline,
      favoriteTracks: favoriteTracks,
      favoriteArtists: artists,
      favoriteGenres: genres,
    }
    
    return handleResponse(returnData, STATUS.OK);
  } catch (error) {
    console.error(error);
    handleResponse({ error: error.message }, STATUS.INTERNAL_SERVER_ERROR);
  }
};
