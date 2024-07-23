import type { StoryLine } from "models/storyline";

const MOODS = {
  1: "sad",
  2: "melancholic",
  3: "happy",
  4: "energetic",
  5: "angry",
  6: "calm",
  7: "romantic",
  8: "optimistic",
  9: "nostalgic",
  10: "hopeful",
  11: "peaceful",
  12: "dreamy",
  13: "sensual",
};

const exapleStoryLine: StoryLine[] = [
  {
    title: "string",
    body: "string",
    footer: "string",
    colorGradient: "string",
  },
  {
    title: "string",
    body: "string",
    footer: "string",
    colorGradient: "string",
  },
];

export const getPrompt = (tracks: any[]) => {
  return `
    We need to analyze the spotify profile of the user to generate a story line.
    Each Story Line is based on a specific theme.
    These are the story lines we have generated for the user:

    1 - Mood base on the user's top tracks (Title: Mood)
    2 - Energy base on the user's top tracks (Title: Energy)
    3 - Popularity base on the user's top tracks (Title: Popularity)
    4 - Animal base on the user's top tracks (Title: What animal are you?)

    The response will be a list of story lines.

    - Body: Maximum 200 characters. Be concise and clear. Add some fun facts or interesting information.
    - Footer: Maximum 50 characters. Add some fun facts or interesting information.
    - colorGradient: A string that represents the color gradient of the story line. It can be any color but 
    based of the theme and the analysis of the user's top tracks.

    It is important to note that the story line should be based on the user's top tracks.
    The user's top tracks and its lyrics, popularity, and other information can be used to generate the story line.
    The story line should be engaging and interesting for the user.

    Return A JSON list of StoryLine objects IN SPANISH, DO NOT ADD TEXT, JUST A JSON LIST OF STORYLINE OBJECTS.

    This is the response model: ${JSON.stringify(exapleStoryLine)}.

    These are the top tracks of the user: ${JSON.stringify(tracks)}.


  `;
};
