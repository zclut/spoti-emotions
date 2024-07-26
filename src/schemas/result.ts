import { z } from "zod";
import { StoryLineSchema } from "@/schemas/storyline";

export const StoryLineResultSchema = z.object({
  results: z.array(StoryLineSchema),
})

export type StoryLineResult = z.infer<typeof StoryLineResultSchema>;