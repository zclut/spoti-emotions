import { getPrompt } from "../utils/ai";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

if (!import.meta.env.GROQ_API_KEY) {
  throw new Error(
    "GROQ_API_KEY environment variable is required. You can get this via https://vercel.com/docs/integrations/ai"
  );
}

const groq = new OpenAI({
  apiKey: import.meta.env.GROQ_API_KEY || "",
  baseURL: "https://api.groq.com/openai/v1",
});

export const getSummary = async (tracks: any[]) => {
  const result = await analyzeAI(tracks);
  return result;
};

function buildPrompt(prompt: string): any{
  return [
    {
      role: "system",
      content: "Return A JSON list of StoryLine objects IN SPANISH, DO NOT ADD TEXT, JUST A JSON LIST OF STORYLINE OBJECTS.",
    },
    {
      role: "user",
      content: prompt,
    },
  ];
}

async function analyzeAI(tracks: any[]) {
  let prompt = getPrompt(tracks);

  const response = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: buildPrompt(prompt),
    max_tokens: 1000,
    response_format: { type: "json_object" },
    temperature: 0.75,
    frequency_penalty: 1,
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream).text();
}
