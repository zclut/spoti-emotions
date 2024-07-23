export const getTopTracks = async (accessToken: string) => {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=2",
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
