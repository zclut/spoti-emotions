import { getPrompt, getSystemPrompt } from "@/utils/ai";
import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { StoryLineResultSchema } from "@/schemas/result";

if (!import.meta.env.GROQ_API_KEY) {
  throw new Error(
    "GROQ_API_KEY environment variable is required. You can get this via https://vercel.com/docs/integrations/ai"
  );
}

const groq = createOpenAI({
  apiKey: import.meta.env.GROQ_API_KEY || "",
  baseURL: "https://api.groq.com/openai/v1",
});

export const getSummary = async (tracks: any[]) => {
  const result = await analyzeAI(tracks);
  return result;
};

async function analyzeAI(tracks: any[]) {
  let prompt = getPrompt(tracks);

  let systemPrompt = getSystemPrompt();

  const model = groq("llama3-70b-8192");

  const { object: { results } } = await generateObject({
    model,
    system: systemPrompt,
    prompt: prompt,
    schema: StoryLineResultSchema,
  });

  return results;
}
