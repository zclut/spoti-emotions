import { z } from "zod";

export const StoryLineSchema = z.object({
  title: z.string(),
  body: z.string(),
});

export type StoryLine = z.infer<typeof StoryLineSchema>;