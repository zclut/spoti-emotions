import type { APIRoute } from "astro";
import { getTopTracks } from "@/services/spotify";
import { getLyrics } from "@/services/lyrics";
import { getSummary } from "@/lib/ai-summary";
import { FAKEDATA } from "@/lib/fake-data";

export const POST: APIRoute = async ({ request }) => {
  if (import.meta.env.DEBUG) {
    let rs = FAKEDATA.map((item: any) => {
      return {
        ...item,
        body: item.body.split("."),
      };
    });
    return new Response(JSON.stringify(rs), { status: 200 });
  }

  const body = await request.json();
  const { accessToken, username } = body;

  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Access token is required" }), {
      status: 400,
    });
  }
  try {
    const response = await getTopTracks(accessToken);
    const data = await response.json();
    if (response.status !== 200) {
      return new Response(JSON.stringify({ error: data.error }), {
        status: response.status,
      });
    }

    let tracks = data.items.map((track: any) => {
      return {
        name: track.name,
        artist: track.artists.map((artist: any) => artist.name).join(", "),
        popularity: track.popularity,
        explicit: track.explicit,
      };
    });

    let popularityMedian =
      tracks.reduce((acc, track) => acc + track.popularity, 0) / tracks.length;

    let dataLyrics = await getLyrics(tracks);

    let result = await getSummary(dataLyrics, username, popularityMedian);
    result = result.map((item: any) => {
      return {
        ...item,
        body: item.body.replace(".", ".sdsd"),
      };
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
