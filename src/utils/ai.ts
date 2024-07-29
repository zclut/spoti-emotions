export const getSystemPrompt = () => {
  return `
    You need to generate a story line based on the user's top tracks on Spotify.
    There will be 4 story lines generated based on the user's top tracks.
    Each story line will be based on a specific theme.

    Structure:
    Title: 100 characters: The title of the story line ONLY.
    Body: 100 characters: In this section generate a story based on the theme of the story line.
    Do not mention the title in this section. Be creative and engaging in this section.
    Example: If the theme is Mood, you can analyze the user's top tracks and generate a story line based on the mood of the tracks.
    colorGradient: A string that represents the color of the story line. It can be a hex color but 
    based of the theme and the analysis of the user's top track. 
  
    Write in Spanish.
  `;
};

export const getPrompt = (tracks: any[], username: string, popularityMedian: number) => {
  return `
    My name is ${username}
    Generate me a list of story lines from these Concepts:

    Mood: The idea is to generate a story line that describes the mood of the user based on the tracks they listen to. You can say
    that you like to listen to sad songs or happy songs, or a mix of both but be creative and engaging in this story line because it is the 
    first one and it is the most important. Analyze the emotions.
    Energy: Based on the user's top tracks, generate a story line that describes the energy of the tracks, ypou can say if the user is
    listening to high energy tracks or low energy tracks, or if the user is listening to a mix of both.
    Popularity: The 'popularity' that goes from 0 to 100, with 0 being the least popular and 100 being the most popular at the moment. The median
    Based on the user's top tracks is ${popularityMedian}, generate a story line and say if the user is a trendsetter or a follower or if the user is listening to popular 
    tracks or is a indie lover, something like that, be creative.
    Animal: Based on the user's top tracks, generate a story line say what is my spirit animal and describes what animal the user is based on 
    the tracks they listen to.

    Speak in second person except for the title of the story line.
    Do not mention my name in the story line title.
    Do not mention that you are talking about the user's top tracks, just generate a story line based on the analysis of the tracks.
    You can mention a name of a track in the story line and the artist.

    speak in spanish

    These are my top tracks: ${JSON.stringify(tracks)}.
  `;
};
